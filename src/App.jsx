import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import TrustBar     from '@/components/TrustBar';
import Features     from '@/components/Features';
import Collections  from '@/components/Collections';
import Process      from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CTABanner    from '@/components/CTABanner';
import Footer       from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <Collections />
      <Process />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
