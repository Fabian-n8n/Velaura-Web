import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp, SplitText, StaggerParent, StaggerChild } from '@/components/ui/animations';

const ease = [0.22, 1, 0.36, 1];

const REVIEWS = [
  {
    name: 'Sarah Lim',
    location: 'River Valley Condo',
    quote:
      "The velvet drapes completely transformed our living room. Velaura\u2019s team was meticulous \u2014 from the consultation to the last hook. Couldn\u2019t be happier.",
    stars: 5,
  },
  {
    name: 'Michael Tan',
    location: 'Sentosa Cove Bungalow',
    quote:
      'We had motorised curtains fitted across 14 windows in our home. Seamless installation, integrates perfectly with HomeKit. Worth every cent.',
    stars: 5,
  },
  {
    name: 'Priya Ramasamy',
    location: 'Toa Payoh HDB',
    quote:
      "I didn\u2019t expect this level of service for our flat. The specialist was thoughtful, the fabrics beautiful, and the fit is immaculate. So glad I found Velaura.",
    stars: 5,
  },
  {
    name: 'James & Clara Wong',
    location: 'Buona Vista Landed',
    quote:
      'Velaura handled our entire home in one go — over 20 windows. The project manager kept us informed throughout and the result is stunning.',
    stars: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="text-white/50 fill-white/50" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 lg:py-36"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <FadeUp>
              <span className="section-label">Client Stories</span>
            </FadeUp>
            <h2 className="text-4xl lg:text-5xl font-medium leading-tight text-white">
              <SplitText text="Homes We've" baseDelay={0} />
              <br />
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.28, ease }}
              >
                Transformed.
              </motion.span>
            </h2>
          </div>
          <FadeUp delay={0.15} className="lg:max-w-xs">
            <p className="text-white/45 text-sm leading-relaxed">
              From four-room HDBs to Sentosa bungalows, every home gets
              our full attention and expertise.
            </p>
          </FadeUp>
        </div>

        {/* Cards */}
        <StaggerParent
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {REVIEWS.map(({ name, location, quote, stars }) => (
            <StaggerChild key={name}>
              <div className="card p-7 flex flex-col gap-5 h-full">
                <Stars count={stars} />
                <p className="text-white/70 text-sm leading-relaxed italic flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{location}</p>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

      </div>
    </section>
  );
}
