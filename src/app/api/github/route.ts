import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'imvikashdev';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    action?: string;
    head?: string;
    pull_request?: {
      title?: string;
      html_url?: string;
      merged?: boolean;
      state?: string;
      base?: { repo?: { full_name?: string; html_url?: string } };
    };
    commits?: {
      sha: string;
      message: string;
      url: string;
    }[];
  };
}

export interface CommitItem {
  message: string;
  repo: string;
  date: string;
  url: string;
  additions: number;
  deletions: number;
}

async function fetchCommitDetails(
  repo: string,
  sha: string,
): Promise<{
  message: string;
  stats: { additions: number; deletions: number };
} | null> {
  if (!GITHUB_TOKEN) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits/${sha}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;
    const data = await res.json();
    return {
      message: data.commit.message,
      stats: data.stats || { additions: 0, deletions: 0 },
    };
  } catch {
    return null;
  }
}

interface CommitInfo {
  sha: string;
  message?: string;
  url?: string;
}

async function fetchLatestCommits(
  events: GitHubEvent[],
): Promise<CommitItem[]> {
  const commits: CommitItem[] = [];
  const seenShas = new Set<string>();

  for (const event of events) {
    if (event.type !== 'PushEvent') continue;

    const payload = event.payload;
    let candidateCommits: CommitInfo[] = [];

    if (payload?.commits && payload.commits.length > 0) {
      candidateCommits = [...payload.commits].reverse();
    } else if (payload?.head) {
      // Fallback to head commit if commits array is missing
      candidateCommits = [{ sha: payload.head }];
    }

    for (const commit of candidateCommits) {
      if (seenShas.has(commit.sha)) continue;
      seenShas.add(commit.sha);

      if (commits.length >= 5) break;

      // Fetch stats and message (if missing)
      const details = await fetchCommitDetails(event.repo.name, commit.sha);

      if (!details) {
        console.warn(`[GitHub API] Failed to fetch details for ${commit.sha}`);
        continue;
      }

      commits.push({
        message: commit.message || details.message, // Use existing message or fetched one
        repo: event.repo.name,
        date: event.created_at.split('T')[0],
        url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
        additions: details.stats?.additions || 0,
        deletions: details.stats?.deletions || 0,
      });
    }

    if (commits.length >= 5) break;
  }

  return commits;
}

export async function GET() {
  try {
    const allEvents: GitHubEvent[] = [];

    // Fetch up to 3 pages of events to get enough history
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'portfolio-app',
            ...(GITHUB_TOKEN
              ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
              : {}),
          },
          next: { revalidate: 3600 },
        },
      );

      if (!res.ok) break;
      const events: GitHubEvent[] = await res.json();
      if (events.length === 0) break;
      allEvents.push(...events);
    }

    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const contributionMap: Record<string, number> = {};
    const current = new Date(oneYearAgo);
    while (current <= now) {
      contributionMap[current.toISOString().split('T')[0]] = 0;
      current.setDate(current.getDate() + 1);
    }

    const contributionTypes = [
      'PushEvent',
      'CreateEvent',
      'PullRequestEvent',
      'IssuesEvent',
      'PullRequestReviewEvent',
      'CommitCommentEvent',
    ];

    for (const event of allEvents) {
      if (!contributionTypes.includes(event.type)) continue;
      const day = event.created_at.split('T')[0];
      if (contributionMap[day] !== undefined) {
        contributionMap[day] += event.type === 'PushEvent' ? 2 : 1;
      }
    }

    const contributions = Object.entries(contributionMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    const totalContributions = contributions.reduce(
      (sum, c) => sum + c.count,
      0,
    );

    // Fetch latest commits with stats
    const latestCommits = await fetchLatestCommits(allEvents);

    return NextResponse.json({
      contributions,
      totalContributions,
      latestCommits, // Replacing pullRequests
      username: GITHUB_USERNAME,
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 },
    );
  }
}
