import { motion } from 'framer-motion';
import { FadeUp, SplitText } from '@/components/ui/animations';

const STEPS = [
  {
    num: '01',
    title: 'Free Home Consultation',
    desc: 'We visit your home at your convenience — no showroom trip needed. Our specialist assesses natural light, room dimensions, and your aesthetic goals.',
  },
  {
    num: '02',
    title: 'Fabric Selection',
    desc: 'Browse 500+ imported fabrics brought directly to your home. Blackout, sheer, linen, velvet — you touch and choose what feels right.',
  },
  {
    num: '03',
    title: 'Precision Measurement',
    desc: 'Every window is measured to the millimetre. We account for track type, ceiling height, and wall construction for a flawless fit.',
  },
  {
    num: '04',
    title: 'Expert Installation',
    desc: 'Our certified installers arrive on schedule. Clean, efficient, and respectful of your home. Most installations are completed within a single day.',
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Process() {
  return (
    <section id="process" className="py-28 lg:py-36" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <FadeUp>
            <span className="section-label">How It Works</span>
          </FadeUp>
          <h2 className="text-4xl lg:text-5xl font-medium leading-tight text-white">
            <SplitText text="Effortless from" baseDelay={0} />
            <br />
            <SplitText text="Start to" baseDelay={0.2} />
            {' '}
            <motion.span
              className="font-serif italic"
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.34, ease }}
            >
              Finish.
            </motion.span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line on desktop */}
          <div
            className="hidden lg:block absolute left-[2.35rem] top-8 bottom-8 w-px"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          />

          <div className="flex flex-col gap-12">
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                className="flex gap-8 lg:gap-12 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
              >
                {/* Step number circle */}
                <div
                  className="relative flex-shrink-0 w-[4.7rem] h-[4.7rem] rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* White bg fills the connector gap */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: '#070612' }}
                  />
                  <span
                    className="relative text-sm font-semibold tracking-widest"
                    style={{ color: '#F07030' }}
                  >
                    {num}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-4 max-w-xl">
                  <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
