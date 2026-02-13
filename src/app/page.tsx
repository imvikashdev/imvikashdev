import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ProofMetrics from '@/components/sections/ProofMetrics';
import Skills from '@/components/sections/Skills';
import ProjectGallery from '@/components/sections/ProjectGallery';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import Credentials from '@/components/sections/Credentials';
import GitHubActivity from '@/components/sections/GitHubActivity';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofMetrics />
        <Skills />
        <ProjectGallery />
        <ExperienceTimeline />
        <Credentials />
        <GitHubActivity />
      </main>
      <Footer />
    </>
  );
}
