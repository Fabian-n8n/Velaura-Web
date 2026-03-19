import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/animations';

const ease = [0.22, 1, 0.36, 1];

export default function CTABanner() {
  return (
    <section
      id="contact"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(240,112,48,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">

        <FadeUp className="mb-5">
          <span className="section-label">Get Started</span>
        </FadeUp>

        {/* Heading with one orange word */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white mb-6">
          {['Transform', 'Your'].map((word, i) => (
            <motion.span
              key={word}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="font-serif italic"
            style={{ display: 'inline-block', color: '#F07030' }}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
          >
            Space.
          </motion.span>
        </div>

        <FadeUp delay={0.2} className="mb-10">
          <p className="text-white/55 text-lg leading-relaxed max-w-lg mx-auto">
            Book a complimentary, no-obligation home visit. We'll come to you,
            understand your vision, and craft something extraordinary together.
          </p>
        </FadeUp>

        <FadeUp delay={0.32}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/book"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F07030' }}
            >
              Book Your Free Home Visit
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+6591234567"
              className="text-sm text-white/45 hover:text-white/70 transition-colors"
            >
              Or call +65 9123 4567
            </a>
          </div>
        </FadeUp>

        {/* Trust note */}
        <FadeUp delay={0.42} className="mt-10">
          <p className="text-xs text-white/25 tracking-wide">
            Free consultation · No pushy sales · 100% custom
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
