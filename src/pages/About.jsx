import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Gem, Ruler, Eye, Leaf, Heart, Zap,
  ArrowUpRight, CheckCircle,
} from 'lucide-react';
import { FadeUp, SplitText, BlurIn } from '@/components/ui/animations';
import Footer from '@/components/Footer';

const ease = [0.22, 1, 0.36, 1];

/* ─── Data ─────────────────────────────────────────────── */

const STATS = [
  { value: '2010', label: 'Founded in Singapore' },
  { value: '2,400+', label: 'Homes Transformed' },
  { value: '500+', label: 'Premium Fabrics' },
  { value: '5-yr', label: 'Warranty on All Work' },
];

const TEAM = [
  {
    name: 'Mei Lin Chen',
    role: 'Founder & Creative Director',
    bio: 'Formerly at a renowned Milan atelier, Mei Lin returned to Singapore to bring European craftsmanship to local homes.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=700&q=80',
  },
  {
    name: 'James Tan',
    role: 'Head of Operations',
    bio: 'With 14 years in luxury home furnishings, James ensures every project runs with precision from first visit to final hang.',
    img: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=600&h=700&q=80',
  },
  {
    name: 'Priya Krishnan',
    role: 'Senior Fabric Consultant',
    bio: "Priya's eye for texture and colour has guided thousands of Singaporeans to the perfect fabric for their space.",
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&h=700&q=80',
  },
  {
    name: 'David Lim',
    role: 'Lead Installation Specialist',
    bio: 'David has installed curtains in over 800 homes — from HDB flats to Sentosa Cove bungalows — without a single callback.',
    img: 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=600&h=700&q=80',
  },
];

const DIFFERENTIATORS = [
  {
    id: '01',
    title: 'Made-to-Measure in Singapore',
    desc: 'Every panel is cut, pleated, and stitched in our Singapore workshop — not shipped from overseas. Local craftsmanship means faster lead times and tighter quality control.',
  },
  {
    id: '02',
    title: 'Free Home Consultations',
    desc: 'We come to you. Our specialists bring fabric samples, measure every window, and advise on the right solution — at no cost and no obligation.',
  },
  {
    id: '03',
    title: 'One Contact, Start to Finish',
    desc: 'Your consultant handles everything: consultation, measurement, sourcing, and installation. No handoffs, no confusion.',
  },
  {
    id: '04',
    title: 'Smart Home Expertise',
    desc: "We're one of the few curtain specialists in Singapore with deep experience integrating motorised curtains into Google Home, Apple HomeKit, and Alexa ecosystems.",
  },
  {
    id: '05',
    title: '5-Year Workmanship Warranty',
    desc: 'We stand behind our craft. Every installation carries a 5-year warranty on workmanship — and we offer free re-hanging if your fabric needs to come down for renovation.',
  },
];

const VALUES = [
  { Icon: Gem,    title: 'Craftsmanship',   desc: 'Every seam is checked, every pleat is uniform. We treat each panel as a permanent feature of your home.' },
  { Icon: Ruler,  title: 'Precision',        desc: 'We measure twice, cut once. Accuracy at every stage is what separates a well-hung curtain from a great one.' },
  { Icon: Eye,    title: 'Transparency',     desc: "Itemised quotes, no hidden costs. You know exactly what you're paying for before we begin." },
  { Icon: Leaf,   title: 'Sustainability',   desc: 'We source responsibly, donate fabric offcuts to community partners, and recommend long-lasting materials over fast fashion.' },
  { Icon: Heart,  title: 'Service',          desc: "White-glove from first call to final hang. We're not done until you're completely satisfied." },
  { Icon: Zap,    title: 'Innovation',       desc: 'We invest in new materials, smart home integration, and techniques so our clients always have access to the best.' },
];

/* ─── Sub-components ────────────────────────────────────── */

function TeamCard({ member, index }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
    >
      {/* Photo */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(7,6,18,0.95) 0%, rgba(7,6,18,0.2) 55%, transparent 100%)',
          }}
        />
      </div>

      {/* Info */}
      <div className="p-5" style={{ background: 'rgba(255,255,255,0.025)' }}>
        <p className="text-sm font-semibold text-white mb-0.5">{member.name}</p>
        <p className="text-xs tracking-[0.1em] uppercase mb-3" style={{ color: '#F07030', opacity: 0.8 }}>
          {member.role}
        </p>
        <p className="text-xs text-white/40 leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
}

function ValueCard({ Icon, title, desc, index }) {
  return (
    <motion.div
      className="rounded-2xl p-6"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Icon size={16} className="text-white/60" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#070612' }}>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(240,112,48,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            Our Story
          </motion.p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight max-w-3xl mb-8">
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Crafted with purpose,
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
            >
              hung with{' '}
              <span className="font-serif italic text-white/60">precision.</span>
            </motion.span>
          </h1>

          <motion.p
            className="text-white/50 text-lg max-w-xl leading-relaxed mb-16"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease }}
          >
            Velaura was born from a simple belief: every home in Singapore deserves
            window treatments that are beautiful, functional, and built to last.
          </motion.p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.07)' }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="px-6 py-5 flex flex-col gap-1"
                style={{ background: '#070612' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.07, ease }}
              >
                <span className="text-2xl font-semibold text-white">{s.value}</span>
                <span className="text-xs text-white/35">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <FadeUp className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <img
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&h=675&q=80"
                alt="Velaura showroom"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(7,6,18,0.4) 0%, transparent 60%)' }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-4 hidden lg:block"
              style={{
                background: 'rgba(10,9,24,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <p className="text-xs text-white/35 mb-1">Established</p>
              <p className="text-lg font-semibold text-white">Since 2010</p>
              <p className="text-xs text-white/30">Tanjong Pagar, Singapore</p>
            </div>
          </FadeUp>

          {/* Text */}
          <div>
            <FadeUp>
              <span className="section-label">Our Story</span>
            </FadeUp>
            <h2 className="text-3xl lg:text-4xl font-medium text-white leading-tight mb-6">
              <SplitText text="Fifteen years of" baseDelay={0} />
              <br />
              <SplitText text="making homes" baseDelay={0.18} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.38, ease }}
              >
                beautiful.
              </motion.span>
            </h2>
            <FadeUp delay={0.1}>
              <p className="text-white/55 text-sm leading-relaxed mb-5">
                Velaura began in 2010 when founder Mei Lin Chen returned from working at a
                Milan atelier and noticed a gap in Singapore's market: most curtain shops
                offered either cheap, off-the-shelf options or luxury imports with months-long
                lead times.
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="text-white/55 text-sm leading-relaxed mb-5">
                She opened a small workshop in Tanjong Pagar with three fabric lines and one
                simple promise — every curtain would be made to measure, in Singapore, and
                fitted by someone who cared. Word spread through condominiums, BTO launches,
                and landed estates. Today, Velaura's team of 14 serves over 300 homes per year.
              </p>
            </FadeUp>
            <FadeUp delay={0.26}>
              <p className="text-white/55 text-sm leading-relaxed">
                We haven't changed what matters: a free home visit, honest advice, and the
                belief that your windows deserve the same attention as every other detail in
                your home.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Mission */}
            <FadeUp>
              <div
                className="rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-between"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div>
                  <span className="text-xs tracking-[0.25em] uppercase text-white/30 mb-6 block">Mission</span>
                  <p className="text-2xl lg:text-3xl font-medium text-white leading-snug mb-6">
                    To make exceptional window treatments accessible to{' '}
                    <span className="font-serif italic text-white/60">every Singapore home.</span>
                  </p>
                  <p className="text-sm text-white/45 leading-relaxed">
                    Whether you live in a two-room HDB or a ten-bedroom bungalow, you deserve
                    curtains that are measured precisely, made beautifully, and installed without
                    drama.
                  </p>
                </div>
                <div
                  className="mt-8 pt-6 flex items-center gap-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <CheckCircle size={14} style={{ color: '#F07030' }} />
                  <span className="text-xs text-white/35">Free consultations for all property types</span>
                </div>
              </div>
            </FadeUp>

            {/* Vision */}
            <FadeUp delay={0.1}>
              <div
                className="rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-between"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div>
                  <span className="text-xs tracking-[0.25em] uppercase text-white/30 mb-6 block">Vision</span>
                  <p className="text-2xl lg:text-3xl font-medium text-white leading-snug mb-6">
                    A Singapore where every window{' '}
                    <span className="font-serif italic text-white/60">tells a story.</span>
                  </p>
                  <p className="text-sm text-white/45 leading-relaxed">
                    We believe interiors should feel intentional. A curtain isn't just a way
                    to block light — it frames how you experience your home morning to night,
                    and how your home presents itself to the world.
                  </p>
                </div>
                <div
                  className="mt-8 pt-6 flex items-center gap-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <CheckCircle size={14} style={{ color: '#F07030' }} />
                  <span className="text-xs text-white/35">Designing for the way Singaporeans truly live</span>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <FadeUp>
                <span className="section-label">Why Velaura</span>
              </FadeUp>
              <h2 className="text-3xl lg:text-4xl font-medium text-white leading-tight">
                <SplitText text="Different by" baseDelay={0} />
                {' '}
                <motion.span
                  className="font-serif italic"
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.22, ease }}
                >
                  design.
                </motion.span>
              </h2>
            </div>
            <FadeUp delay={0.1} className="lg:max-w-xs">
              <p className="text-white/45 text-sm leading-relaxed">
                Singapore has no shortage of curtain shops. Here's why the ones who've tried others
                come to us.
              </p>
            </FadeUp>
          </div>

          {/* Differentiator list */}
          <div className="flex flex-col">
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div
                key={d.id}
                className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-7"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
              >
                <span className="text-xs tracking-[0.2em] text-white/25 md:w-10 flex-shrink-0 pt-0.5">{d.id}</span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed max-w-2xl">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <FadeUp>
              <span className="section-label">What We Stand For</span>
            </FadeUp>
            <h2 className="text-3xl lg:text-4xl font-medium text-white leading-tight">
              <SplitText text="Our" baseDelay={0} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14, ease }}
              >
                Values.
              </motion.span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="py-24 lg:py-32"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
            <div>
              <FadeUp>
                <span className="section-label">The People</span>
              </FadeUp>
              <h2 className="text-3xl lg:text-4xl font-medium text-white leading-tight">
                <SplitText text="The team behind" baseDelay={0} />
                <br />
                <motion.span
                  className="font-serif italic"
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.3, ease }}
                >
                  every window.
                </motion.span>
              </h2>
            </div>
            <FadeUp delay={0.1} className="lg:max-w-xs">
              <p className="text-white/45 text-sm leading-relaxed">
                Small by choice. Every member of our team has been with us for at least three
                years and handles your project personally.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 lg:py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <h2 className="text-3xl lg:text-4xl font-medium text-white mb-5 leading-tight">
              <SplitText text="Ready to meet" baseDelay={0} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
              >
                the team?
              </motion.span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/45 text-sm max-w-sm mx-auto leading-relaxed mb-8">
              Book a free home consultation and one of our specialists will visit at a time
              that suits you.
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
