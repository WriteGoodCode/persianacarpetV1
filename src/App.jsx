import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { CollectorStory } from './components/CollectorStory';
import { BentoGrid } from './components/BentoGrid';
import { HowToBuy } from './components/HowToBuy';
import { RugShowcase } from './components/RugShowcase';
import { Authentication } from './components/Authentication';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-[#0D0D12] selection:bg-[#C9A84C] selection:text-[#0D0D12] flex flex-col">
      <TopBar />
      <Hero />
      <CollectorStory />
      <BentoGrid />
      <HowToBuy />
      <RugShowcase />
      <Authentication />
      <Footer />
    </main>
  );
}

export default App;
