import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
