import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { getCollectionBySlug, getRelatedCollections, COLLECTIONS } from '@/data/collections';
import { FadeUp, SplitText, BlurIn } from '@/components/ui/animations';
import Footer from '@/components/Footer';

const ease = [0.22, 1, 0.36, 1];

/* ── Curtain strip decoration ── */
function CurtainStrips({ gradient, shimmer }) {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[42%] flex pointer-events-none overflow-hidden">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 h-full"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,${0.055 - i * 0.003}) 0%, rgba(255,255,255,0.005) 100%)`,
            borderLeft: '1px solid rgba(255,255,255,0.04)',
          }}
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{ scaleY: 1, transformOrigin: 'top' }}
          transition={{ duration: 1.1, delay: 0.1 + i * 0.05, ease }}
        />
      ))}
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${shimmer} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

/* ── Feature card ── */
function FeatureCard({ Icon, title, desc, index, accentColor }) {
  return (
    <motion.div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${accentColor}18` }}
      >
        <Icon size={18} style={{ color: accentColor }} />
      </div>
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ── Related collection mini-card ── */
function RelatedCard({ col }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/collections/${col.slug}`}
        className="group block rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Swatch */}
        <div
          className="relative h-40 w-full overflow-hidden"
          style={{ background: col.gradient }}
        >
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
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 70% at 30% 60%, ${col.shimmer} 0%, transparent 70%)`,
            }}
          />
          <span className="absolute top-4 left-4 text-xs tracking-[0.2em] text-white/30">{col.id}</span>
          <div
            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
          >
            <ArrowUpRight size={12} className="text-white" />
          </div>
        </div>
        {/* Info */}
        <div className="p-4" style={{ background: 'rgba(255,255,255,0.025)' }}>
          <p className="text-sm font-semibold text-white mb-1">{col.name}</p>
          <p className="text-xs text-white/40 leading-relaxed">{col.tagline}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CollectionPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const col = getCollectionBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!col) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/50 text-sm">Collection not found.</p>
        <Link to="/collections" className="text-white text-sm underline underline-offset-4">
          View all collections
        </Link>
      </div>
    );
  }

  const related = getRelatedCollections(col.relatedSlugs);

  return (
    <div className="min-h-screen" style={{ background: '#070612' }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '72vh', background: col.gradient }}
      >
        {/* Fabric texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.012) 0px,
              rgba(255,255,255,0.012) 1px,
              transparent 1px,
              transparent 22px
            )`,
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #070612 0%, transparent 100%)' }}
        />

        <CurtainStrips gradient={col.gradient} shimmer={col.shimmer} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors duration-200 tracking-[0.1em] uppercase"
            >
              <ArrowLeft size={13} />
              All Collections
            </Link>
          </motion.div>

          {/* Collection number */}
          <motion.span
            className="block text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: col.accentColor, opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            Collection {col.id}
          </motion.span>

          {/* Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium leading-none text-white mb-6 max-w-2xl">
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              {col.name}
            </motion.span>
            <motion.span
              className="font-serif italic block"
              style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '0.55em' }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
            >
              Collection.
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="text-white/60 text-lg max-w-md leading-relaxed mb-10"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            {col.tagline}
          </motion.p>

          {/* Price + CTA */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease }}
          >
            <span className="text-white/40 text-sm">{col.from}</span>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: '#F07030' }}
            >
              Book a Free Home Visit
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Long Description ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="section-label">Overview</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-white/70 text-lg leading-relaxed">{col.longDesc}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        className="py-20 lg:py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <FadeUp>
              <span className="section-label">What It Does</span>
            </FadeUp>
            <h2 className="text-3xl lg:text-4xl font-medium text-white leading-tight">
              <SplitText text="Built for" baseDelay={0} />
              {' '}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: 0.25, ease }}
              >
                Performance.
              </motion.span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {col.features.map((f, i) => (
              <FeatureCard
                key={f.title}
                Icon={f.Icon}
                title={f.title}
                desc={f.desc}
                index={i}
                accentColor={col.accentColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Specs + Ideal For ── */}
      <section
        className="py-20 lg:py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Specs table */}
          <FadeUp>
            <span className="section-label mb-6 block">Specifications</span>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              {Object.entries(col.specs).map(([key, val], i) => (
                <div
                  key={key}
                  className="flex justify-between px-5 py-3.5 text-sm"
                  style={{
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.01)',
                    borderBottom: i < Object.keys(col.specs).length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span className="text-white/40">{key}</span>
                  <span className="text-white/75 text-right max-w-[55%]">{val}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Ideal For */}
          <FadeUp delay={0.1}>
            <span className="section-label mb-6 block">Ideal For</span>
            <div className="flex flex-wrap gap-3 mb-10">
              {col.idealFor.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/65"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Check size={11} style={{ color: col.accentColor }} />
                  {item}
                </span>
              ))}
            </div>

            {/* Care note */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs text-white/35 uppercase tracking-[0.15em] mb-2">Care Instructions</p>
              <p className="text-sm text-white/60">{col.specs['Care'] ?? col.specs['Care Instructions']}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Related Collections ── */}
      {related.length > 0 && (
        <section
          className="py-20 lg:py-28"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12 gap-4">
              <div>
                <FadeUp>
                  <span className="section-label">Explore More</span>
                </FadeUp>
                <h2 className="text-3xl font-medium text-white">
                  <SplitText text="Related" baseDelay={0} />
                  {' '}
                  <motion.span
                    className="font-serif italic"
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease }}
                  >
                    Collections.
                  </motion.span>
                </h2>
              </div>
              <FadeUp delay={0.1}>
                <Link
                  to="/#collections"
                  className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
                >
                  View all <ArrowUpRight size={12} />
                </Link>
              </FadeUp>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <RelatedCard key={r.slug} col={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section
        className="py-20 lg:py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <span className="section-label mb-4 block">Next Step</span>
          </FadeUp>
          <h2 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight">
            <SplitText text="Ready to transform" baseDelay={0} />
            <br />
            <SplitText text="your" baseDelay={0.2} />
            {' '}
            <motion.span
              className="font-serif italic"
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.36, ease }}
            >
              space?
            </motion.span>
          </h2>
          <FadeUp delay={0.15}>
            <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed mb-10">
              Book a free, no-obligation home consultation. Our specialist visits your home,
              brings fabric samples, and handles measurements — at no cost.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
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
