export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  tech: string[];
  status: 'Live' | 'Sunset' | 'In Development';
  url?: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  type: 'Certification' | 'Achievement';
  detail?: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

// ─── Projects ──────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'rizzwing',
    title: 'Rizzwing AI',
    description: 'AI-driven relationship assistant',
    summary:
      'Built and scaled an AI SaaS to 50,000+ users, architecting backend systems to handle multimodal inputs including voice, images, and video. Optimized for 500+ concurrent users. Integrated Stripe and Razorpay generating $2K+ monthly revenue.',
    tech: [
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'TypeScript',
      'Next.js',
      'Gemini',
    ],
    status: 'Sunset',
    metrics: '50k+ users · $2K+/mo revenue',
  },
  {
    id: 'xdc-observer',
    title: 'XDC Observer',
    description: 'XDC network blockscan observer',
    summary:
      'Orchestrated microservices for real-time monitoring of XDC-based contracts and token transfers, reducing data lag by 40%. Deployed RabbitMQ and Redis for batch processing, handling up to 5,000 transactions/minute with 99% accuracy.',
    tech: [
      'Web3.js',
      'Node.js',
      'RabbitMQ',
      'Redis',
      'MongoDB',
      'Microservices',
    ],
    status: 'Live',
    url: 'https://xdcobserver.io/',
    metrics: '5,000 tx/min · 99% accuracy',
  },
  {
    id: 'linkpad',
    title: 'LinkPad',
    description: 'Serverless Secure Editor',
    summary:
      'Architected a 100% serverless app that eliminates database costs by storing compressed data directly within the URL hash using native CompressionStream APIs. Custom zero-dependency rich-text editor with 100/100 Lighthouse score.',
    tech: ['JavaScript', 'HTML5', 'CompressionStream API', 'Web APIs', 'DOM'],
    status: 'Live',
    url: 'https://linkpad.imvikash.dev',
    metrics: '100/100 Lighthouse',
  },
  {
    id: 'crypto-pg',
    title: 'Crypto Payment Gateway',
    description: 'Third-party gateway on XinFin network',
    summary:
      'Architected a multi-coin payment gateway on the XinFin network (XDC, USDT, USDC, ETH) processing 300+ daily transactions with near-instant confirmations. Reduced fraud by 25% via secure proxy servers.',
    tech: [
      'Web3.js',
      'Node.js',
      'Express',
      'Blockchain',
      'Proxy Wallets',
      'MongoDB',
    ],
    status: 'Live',
    url: 'https://pg.icotokens.net',
    metrics: '300+ daily tx',
  },
  {
    id: 'talentthread',
    title: 'TalentThreadAI',
    description: 'AI-based resume and cover letter builder',
    summary:
      'Led development of an AI resume builder using FastAPI, Azure Document Intelligence, and OpenAI Assistant API. Saves users ~2 hours per draft while maintaining 99.9% uptime on Azure.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'Azure', 'Docker', 'React'],
    status: 'Live',
    url: 'https://talentthreads.ai/',
    metrics: '99.9% uptime',
  },
  {
    id: 'scoutlog',
    title: 'ScoutLog',
    description: 'Geospatial Route Engine',
    summary:
      'Developed an interactive route planner using Object-Oriented JavaScript and Leaflet.js to manage complex vector drawing logic and polymorphic data inheritance. Client-side persistence via LocalStorage for offline data re-hydration.',
    tech: [
      'JavaScript',
      'Leaflet.js',
      'OOP',
      'Geolocation API',
      'LocalStorage',
    ],
    status: 'Live',
    url: 'https://scoutlog.imvikash.dev',
  },
  {
    id: 'insite-work',
    title: 'Insite Work',
    description: 'Construction management platform',
    summary:
      'Developed a robust construction management platform featuring a custom drag-and-drop form builder for audits using React-DND. Real-time dashboards and dynamic role-based pricing reduced compliance reporting errors by 15%.',
    tech: [
      'React',
      'Node.js',
      'PostgreSQL',
      'React-DND',
      'Bootstrap',
      'Syncfusion',
    ],
    status: 'Live',
    url: 'https://insite.work/',
  },
  {
    id: 'xdc-pay',
    title: 'XDC Pay',
    description: 'Browser Extension Wallet',
    summary:
      'Ported MetaMask wallet functionality to the XDC network, managing default configurations for XDC and the Apothem testnet. Seamless interaction with XDC-based dApps for Web3 developers.',
    tech: [
      'React',
      'Web3.js',
      'TypeScript',
      'Browser Extensions',
      'Blockchain',
    ],
    status: 'Live',
    url: 'https://chromewebstore.google.com/detail/xdcpay/dgimfmajflciajjbhbkibdbfmpncbnmj',
  },
  {
    id: 'xdc-safe',
    title: 'XDC Safe',
    description: 'Multi-signature wallet on XDC network',
    summary:
      'Ported Gnosis Safe to the XDC network by deploying transaction, gateway, and configuration services on self-hosted Ubuntu infrastructure. Automated deployment using Python-based system services.',
    tech: ['Multi-sig', 'Web3', 'Python', 'Next.js', 'Ubuntu', 'XDC-Safe'],
    status: 'Live',
    url: 'https://xdcsafe.xdcscan.com',
  },
  {
    id: 'dopu-fortune',
    title: 'Dopu Fortune Games',
    description: 'Interactive culturally distinct gaming platform',
    summary:
      'Developed 14 culturally distinct interactive themes and a quest system. Implemented global leaderboards and engagement-based weekly usage limits to drive player retention and manage smart contract interactions.',
    tech: [
      'Web3',
      'Smart-contract',
      'React',
      'Node.js',
      'MongoDB',
      'Prisma',
      'TypeScript',
    ],
    status: 'Live',
    url: 'https://fortune.dopu.ai/',
  },
];

// ─── Experience ────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: 'jackpass',
    role: 'Full Stack Engineer',
    company: 'Jackpass',
    location: 'Remote',
    period: 'Mar 2025 — Dec 2025',
    description:
      'Built and scaled Rizzwing, an AI-powered WhatsApp assistant used by 50,000+ users. Owned end-to-end development, payment flows via Stripe/Razorpay generating $2K+ monthly revenue, and optimized architecture for high concurrency.',
    highlights: [
      'Scaled to 50,000+ users with 500+ concurrent sessions',
      'Integrated Stripe & Razorpay — $2K+/mo revenue',
      'Architected multimodal AI pipeline (voice, image, video)',
      'Optimized backend for high concurrency without slowing down',
    ],
  },
  {
    id: 'circle-studio',
    role: 'Full-Stack Developer',
    company: 'Circle Studio',
    location: 'Surat, Gujarat',
    period: 'Sep 2022 — Mar 2025',
    description:
      'Delivered full-stack solutions for multiple clients across Web2 and Web3. Built blockchain infrastructure including a real-time block scanner with multi-service architecture using RabbitMQ and Redis.',
    highlights: [
      'Built real-time block scanner with RabbitMQ + Redis',
      'Reduced application load times by 25% through optimization',
      'Translated Figma designs into scalable React/Next.js interfaces',
      'Delivered solutions across Web2 and Web3 ecosystems',
    ],
  },
];

// ─── Credentials ───────────────────────────────────────────

export const credentials: Credential[] = [
  {
    id: 'hackerrank-js',
    title: 'JavaScript (Advanced)',
    issuer: 'HackerRank',
    type: 'Certification',
  },
  {
    id: 'hackerrank-react',
    title: 'React (Intermediate)',
    issuer: 'HackerRank',
    type: 'Certification',
  },
  {
    id: 'hackerrank-node',
    title: 'Node.js (Intermediate)',
    issuer: 'HackerRank',
    type: 'Certification',
  },
  {
    id: 'smart-hackathon',
    title: 'District-Level Winner — Smart Hackathon',
    issuer: 'Gujarat Government',
    type: 'Achievement',
    detail:
      'Led a team to build a smart city project featuring magnetic trains and sustainable infrastructure.',
  },
];

// ─── Skills ────────────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'Vanilla JS',
      'TypeScript',
      'Tailwind CSS',
      'SCSS',
      'Vue.js',
      'ShadCN',
    ],
  },
  {
    name: 'Backend',
    skills: [
      'Node.js',
      'Express',
      'Python',
      'FastAPI',
      'Prisma',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'RabbitMQ',
    ],
  },
  {
    name: 'Web3 / Cloud',
    skills: ['Web3.js', 'Solidity', 'AWS', 'Azure', 'GCP', 'Docker', 'CI/CD'],
  },
];

// ─── Proof Metrics ─────────────────────────────────────────

export const proofMetrics = [
  { label: 'Users Scaled', value: '50k+' },
  { label: 'Transactions/Min', value: '5,000' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Monthly Revenue', value: '$2K+' },
  { label: 'Projects Shipped', value: '10+' },
  { label: 'Concurrent Users', value: '500+' },
];

// ─── Social Links ──────────────────────────────────────────

export const socials = {
  github: 'https://github.com/imvikashdev',
  linkedin: 'https://www.linkedin.com/in/vikash-choudhary-536324156/',
  x: 'https://x.com/imvikashdev',
  email: 'imvikashhereyo@gmail.com',
};
