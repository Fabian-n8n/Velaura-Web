import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import { FadeUp, SplitText } from '@/components/ui/animations';
import Footer from '@/components/Footer';

const ease = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    number: '01',
    title: 'Book a Free\nHome Consultation',
    summary: 'We come to you — no cost, no commitment.',
    desc: "Everything begins with a visit to your home. Your dedicated Velaura consultant arrives at a time that suits you, walks every room you'd like to address, listens carefully to your needs, and assesses natural light, window dimensions, and interior style. There's no pressure to decide anything on the day.",
    highlights: [
      'Available on weekdays and weekends',
      'Consultant brings full fabric sample library',
      'No deposit or commitment required',
      'Covers HDB, condo, landed, and commercial',
    ],
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&h=700&q=80',
    side: 'right',
  },
  {
    number: '02',
    title: 'Explore Fabrics\n& Design Together',
    summary: 'Choose from 500+ imported fabrics with expert guidance.',
    desc: "With samples in hand and your space in front of us, we walk you through our full fabric library — organised by collection, opacity, and feel. Your consultant explains the technical properties of each option alongside the aesthetic ones, helping you find the fabric that works hardest for your lifestyle, not just looks best in a showroom.",
    highlights: [
      '500+ fabrics from Japan, Belgium, Italy & more',
      'Guidance on opacity, UV rating, and care',
      'Digital visualisation available on request',
      'Mix collections across different rooms',
    ],
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&h=700&q=80',
    side: 'left',
  },
  {
    number: '03',
    title: 'Precision\nMeasurement',
    summary: 'Every millimetre matters. We measure, you relax.',
    desc: "Once you've chosen your fabric and style, our specialist measures every window with professional-grade tools. We account for ceiling height, wall recesses, architraves, radiators, and any architectural quirks. Every measurement is logged digitally, double-checked on-site, and verified again at the workshop before cutting begins.",
    highlights: [
      'Measured to the millimetre, not the centimetre',
      'Ceiling-to-floor, wall-to-wall, and recess measurements',
      'Digital measurement record shared with you',
      'Re-measurement offered free if renovation occurs',
    ],
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&h=700&q=80',
    side: 'right',
  },
  {
    number: '04',
    title: 'Handcrafted\nin Singapore',
    summary: 'Every panel cut, pleated, and stitched locally.',
    desc: "Your curtains are made in our Tanjong Pagar workshop by our team of experienced seamstresses — not shipped pre-made from overseas. Each panel is cut against your exact measurements, pleated by hand, and finished to the tolerances we've maintained since 2010. Lead time is typically 10–14 working days from confirmation.",
    highlights: [
      'Made-to-measure in Singapore, not imported',
      'Hand-finished pleating and heading tape',
      '10–14 working days standard lead time',
      'Rush orders accommodated where possible',
    ],
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&h=700&q=80',
    side: 'left',
  },
  {
    number: '05',
    title: 'Expert\nInstallation',
    summary: 'Fitted, hung, and perfected — the same day.',
    desc: "Our installation team arrives on the agreed date, fits all tracks or rods, hangs every panel, and dresses the curtains so they fall correctly from the first day. We clean up entirely before we leave, walk you through care and operation, and don't consider the job done until you're completely happy. Motorised systems are calibrated and paired to your smart home on-site.",
    highlights: [
      'Clean, efficient installation — typically 2–4 hours',
      'All fixings and hardware included',
      'Motorised systems paired and tested on the day',
      '5-year workmanship warranty from installation date',
    ],
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&h=700&q=80',
    side: 'right',
  },
];

/* ── Step block ── */
function StepBlock({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const isLeft = step.side === 'left';

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">

      {/* Image */}
      <motion.div
        className={`relative overflow-hidden ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ minHeight: 480 }}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <img
          src={step.img}
          alt={step.title.replace('\n', ' ')}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isLeft
              ? 'linear-gradient(to right, rgba(7,6,18,0) 0%, rgba(7,6,18,0.55) 100%)'
              : 'linear-gradient(to left, rgba(7,6,18,0) 0%, rgba(7,6,18,0.55) 100%)',
          }}
        />
        {/* Step number watermark */}
        <motion.span
          className="absolute bottom-6 font-semibold select-none pointer-events-none"
          style={{
            fontSize: 'clamp(72px, 12vw, 140px)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.06)',
            right: isLeft ? 'auto' : 24,
            left:  isLeft ? 24 : 'auto',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          {step.number}
        </motion.span>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`flex flex-col justify-center px-10 py-16 lg:px-16 ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
        style={{ background: 'rgba(255,255,255,0.015)' }}
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        {/* Step badge */}
        <motion.span
          className="inline-block text-xs tracking-[0.25em] uppercase mb-5"
          style={{ color: '#F07030', opacity: 0.85 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.85 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          Step {step.number}
        </motion.span>

        {/* Title */}
        <motion.h2
          className="text-3xl lg:text-4xl font-medium text-white leading-snug mb-4 whitespace-pre-line"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease }}
        >
          {step.title}
        </motion.h2>

        {/* Summary */}
        <motion.p
          className="text-base text-white/50 mb-5 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          {step.summary}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm text-white/38 leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.48, ease }}
        >
          {step.desc}
        </motion.p>

        {/* Highlights */}
        <motion.ul
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease }}
        >
          {step.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm text-white/50">
              <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: '#F07030', opacity: 0.7 }} />
              {h}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

/* ── Page ── */
export default function Process() {
  return (
    <div className="min-h-screen" style={{ background: '#070612' }}>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            How It Works
          </motion.p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight max-w-3xl mb-8">
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Five steps to
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
            >
              your perfect{' '}
              <span className="font-serif italic text-white/55">curtains.</span>
            </motion.span>
          </h1>

          <motion.p
            className="text-white/48 text-lg max-w-xl leading-relaxed mb-16"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease }}
          >
            From the moment you reach out to the day we hang the last panel —
            a seamless, no-surprise experience designed around your home and schedule.
          </motion.p>

          {/* Step overview pills */}
          <div className="flex flex-wrap gap-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.number}
                className="flex items-center gap-2.5 rounded-full px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease }}
              >
                <span className="text-xs" style={{ color: '#F07030' }}>{s.number}</span>
                <span className="text-xs text-white/50">{s.title.replace('\n', ' ')}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <StepBlock step={step} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline summary ── */}
      <section className="py-24 lg:py-32" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="mb-14">
            <span className="section-label">From Start to Finish</span>
            <h2 className="text-3xl lg:text-4xl font-medium text-white leading-tight mt-2">
              <SplitText text="Typical timeline" baseDelay={0} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
              >
                overview.
              </motion.span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-px overflow-hidden rounded-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.07)' }}>
            {[
              { step: '01', label: 'Consultation', time: 'Day 1' },
              { step: '02', label: 'Fabric & Design', time: 'Day 1' },
              { step: '03', label: 'Measurement', time: 'Day 1–3' },
              { step: '04', label: 'Production', time: '10–14 days' },
              { step: '05', label: 'Installation', time: 'Day 14–17' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="px-6 py-6 flex flex-col gap-2"
                style={{ background: '#070612' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <span className="text-xs" style={{ color: '#F07030', opacity: 0.75 }}>{item.step}</span>
                <span className="text-sm font-medium text-white">{item.label}</span>
                <span className="text-xs text-white/30">{item.time}</span>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-5">
            <p className="text-xs text-white/30 leading-relaxed max-w-lg">
              Timeline is indicative. Rush orders and extended lead times may apply during peak periods
              (Chinese New Year, National Day). Your consultant will advise on exact dates at consultation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <h2 className="text-3xl lg:text-4xl font-medium text-white mb-5">
              <SplitText text="Ready to start" baseDelay={0} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
              >
                step one?
              </motion.span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/42 text-sm max-w-xs mx-auto leading-relaxed mb-8">
              Book your free home visit. No cost, no commitment — just great curtains.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ background: '#F07030' }}
            >
              Book a Free Home Visit
              <ArrowUpRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
