import { Home, BookOpen, Ruler, Zap, Shield, HeartHandshake } from 'lucide-react';
import { FadeUp, SplitText, StaggerParent, StaggerChild } from '@/components/ui/animations';

const FEATURES = [
  {
    icon: Home,
    title: 'Free Home Consultation',
    desc: 'Our specialists visit your HDB, condo, or landed property at a time that suits you — no obligation.',
  },
  {
    icon: BookOpen,
    title: '500+ Fabric Library',
    desc: 'Curated from Japan, Italy, and Belgium. Blackout, sheer, thermal, and everything between.',
  },
  {
    icon: Ruler,
    title: 'Precision Measurement',
    desc: 'Every centimetre matters. We measure on-site to guarantee a perfect, tailored fit.',
  },
  {
    icon: Zap,
    title: 'Smart Home Integration',
    desc: 'Motorised curtains compatible with Google Home, Apple HomeKit, and Alexa out of the box.',
  },
  {
    icon: Shield,
    title: '5-Year Warranty',
    desc: 'We stand behind our craftsmanship. Fabric, hardware, and installation all covered.',
  },
  {
    icon: HeartHandshake,
    title: 'After-Sales Care',
    desc: "Complimentary adjustments and cleaning advice \u2014 we\u2019re with you long after install day.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <FadeUp>
            <span className="section-label">Why Velaura</span>
          </FadeUp>
          <h2 className="text-4xl lg:text-5xl font-medium leading-tight text-white">
            <SplitText text="Crafted Around" baseDelay={0} />
            <br />
            <SplitText
              text="Your Home."
              baseDelay={0.2}
              className="font-serif italic"
            />
          </h2>
          <FadeUp delay={0.2} className="mt-5">
            <p className="text-white/55 text-lg leading-relaxed">
              Every detail, from the first visit to the final hem, is designed
              to feel effortless for you.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <StaggerParent
          stagger={0.09}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <StaggerChild key={title}>
              <div className="card p-7 h-full group cursor-default">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <Icon className="w-4.5 h-4.5 text-white/60" size={18} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

      </div>
    </section>
  );
}
