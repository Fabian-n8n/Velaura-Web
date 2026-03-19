import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp, SplitText, StaggerParent, StaggerChild } from '@/components/ui/animations';

const COLLECTIONS = [
  {
    id: '01',
    name: 'Blackout',
    tagline: 'Total darkness. Absolute serenity.',
    desc: "Block Singapore\u2019s equatorial sun completely. Ideal for bedrooms, home theatres, and light-sensitive spaces.",
    from: 'From SGD 280',
    // rich dark navy gradient
    gradient: 'linear-gradient(160deg, #111827 0%, #1e2a3a 50%, #0d1520 100%)',
    shimmer: 'rgba(30,80,140,0.25)',
  },
  {
    id: '02',
    name: 'Sheer',
    tagline: 'Let light dance through your rooms.',
    desc: 'Diffuse harsh sunlight into a soft, luminous glow. Privacy without sacrificing the view.',
    from: 'From SGD 190',
    gradient: 'linear-gradient(160deg, #1a1626 0%, #241e38 50%, #1c1830 100%)',
    shimmer: 'rgba(200,180,255,0.12)',
  },
  {
    id: '03',
    name: 'Motorised',
    tagline: 'Automated luxury at your fingertips.',
    desc: 'Google Home, Apple HomeKit, and Alexa-compatible. Schedule, voice-control, or use the silent motor.',
    from: 'From SGD 520',
    gradient: 'linear-gradient(160deg, #0f1a26 0%, #162030 50%, #0a1420 100%)',
    shimmer: 'rgba(59,130,246,0.18)',
  },
  {
    id: '04',
    name: 'Linen',
    tagline: 'Natural. Breathable. Effortless.',
    desc: "Organic linen weaves that age beautifully. The perfect everyday drape for Singapore\u2019s tropical climate.",
    from: 'From SGD 240',
    gradient: 'linear-gradient(160deg, #1e1810 0%, #2a2218 50%, #1a1510 100%)',
    shimmer: 'rgba(200,170,100,0.15)',
  },
  {
    id: '05',
    name: 'Velvet',
    tagline: 'Theatre-grade drama for your interior.',
    desc: 'Rich, heavy velvet with exceptional acoustic dampening. A statement piece in any living room.',
    from: 'From SGD 380',
    gradient: 'linear-gradient(160deg, #1a0f22 0%, #28183a 50%, #160c1e 100%)',
    shimmer: 'rgba(139,92,246,0.2)',
  },
  {
    id: '06',
    name: 'S-Fold',
    tagline: 'Architectural precision. Minimal beauty.',
    desc: 'Signature wave-fold construction that hangs with perfect, uniform S-curves. A modernist favourite.',
    from: 'From SGD 320',
    gradient: 'linear-gradient(160deg, #141414 0%, #1e1e1e 50%, #121212 100%)',
    shimmer: 'rgba(255,255,255,0.08)',
  },
];

function CollectionCard({ col, index }) {
  return (
    <motion.a
      href="#contact"
      className="group block rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Fabric swatch area */}
      <div
        className="relative h-52 w-full overflow-hidden"
        style={{ background: col.gradient }}
      >
        {/* Fabric texture lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 18px
            )`,
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 70% at 30% 60%, ${col.shimmer} 0%, transparent 70%)`,
          }}
        />
        {/* Collection number */}
        <span
          className="absolute top-5 left-5 text-xs tracking-[0.2em] text-white/30"
        >
          {col.id}
        </span>
        {/* Arrow icon */}
        <div
          className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
        >
          <ArrowUpRight size={13} className="text-white" />
        </div>
      </div>

      {/* Info */}
      <div
        className="p-6"
        style={{ background: 'rgba(255,255,255,0.025)' }}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-white">{col.name}</h3>
          <span className="text-xs text-white/35 mt-0.5">{col.from}</span>
        </div>
        <p className="text-xs text-white/45 leading-relaxed mb-1">{col.tagline}</p>
        <p className="text-xs text-white/30 leading-relaxed">{col.desc}</p>
      </div>
    </motion.a>
  );
}

export default function Collections() {
  return (
    <section id="collections" className="py-28 lg:py-36" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <FadeUp>
              <span className="section-label">Our Collections</span>
            </FadeUp>
            <h2 className="text-4xl lg:text-5xl font-medium leading-tight text-white">
              <SplitText text="Every Fabric," baseDelay={0} />
              <br />
              <SplitText text="Every" baseDelay={0.21} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                Story.
              </motion.span>
            </h2>
          </div>
          <FadeUp delay={0.15} className="lg:max-w-xs">
            <p className="text-white/50 text-sm leading-relaxed">
              Six collections, each crafted from imported fabrics, tailored
              to Singapore's light, climate, and way of living.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.id} col={col} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
