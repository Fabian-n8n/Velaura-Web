import TrustBar     from '@/components/TrustBar';
import Hero         from '@/components/Hero';
import Features     from '@/components/Features';
import Collections  from '@/components/Collections';
import Process      from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CTABanner    from '@/components/CTABanner';
import Footer       from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <Collections />
      <Process />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}
