import StickyHeader from './components/StickyHeader'
import Hero from './components/Hero'
import CollectorStory from './components/CollectorStory'
import HowToBuy from './components/HowToBuy'
import RugShowcase from './components/RugShowcase'
import AuthCallout from './components/AuthCallout'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <StickyHeader />
      <main>
        <Hero />
        <CollectorStory />
        <HowToBuy />
        <RugShowcase />
        <AuthCallout />
      </main>
      <Footer />
    </>
  )
}
