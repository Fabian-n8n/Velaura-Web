import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Hls from 'hls.js';

const HLS_SRC = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';
const ease    = [0.22, 1, 0.36, 1];

/* ─── HLS Video ─────────────────────────────────────────────── */
function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true, startLevel: -1 });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      loop muted playsInline
      className="absolute top-0 left-0 h-full"
      style={{
        width: '100%',
        marginLeft: '200px',
        objectFit: 'cover',
        objectPosition: 'center',
        transform: 'scale(1.2)',
        transformOrigin: 'left center',
        zIndex: 0,
      }}
    />
  );
}

/* ─── BlurIn (mount-time) ────────────────────────────────────── */
function BlurIn({ children, delay = 0, duration = 0.6, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SplitText (mount-time, for hero only) ──────────────────── */
function SplitText({ text, baseDelay = 0, wordDelay = 0.08, duration = 0.6 }) {
  const words = text.split(' ');
  return words.map((word, i) => (
    <motion.span
      key={`${word}-${i}`}
      style={{ display: 'inline-block', marginRight: '0.28em' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay: baseDelay + i * wordDelay, ease }}
    >
      {word}
    </motion.span>
  ));
}

/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const line1Words = 3; // "Dress Your Home"
  const line2Words = 2; // "in Pure"
  const wordDelay  = 0.08;

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#070612' }}
    >
      <HeroVideo />

      {/* Left vignette */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: '60%',
          background: 'linear-gradient(to right, #070612 35%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #070612 0%, transparent 100%)',
          zIndex: 10,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center pt-20" style={{ zIndex: 20 }}>
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">

          {/* Badge */}
          <BlurIn delay={0} duration={0.6} className="mb-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 backdrop-blur-sm px-3.5 py-1.5">
              <Sparkles className="w-3 h-3 text-white/70" />
              <span className="text-sm font-medium text-white/70 tracking-wide">
                Singapore's Premier Curtain Atelier
              </span>
            </div>
          </BlurIn>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-white mb-7">
            <span className="block">
              <SplitText
                text="Dress Your Home"
                baseDelay={0}
                wordDelay={wordDelay}
                duration={0.6}
              />
            </span>
            <span>
              <SplitText
                text="in Pure"
                baseDelay={line1Words * wordDelay}
                wordDelay={wordDelay}
                duration={0.6}
              />
              {/* Serif italic accent */}
              <motion.span
                className="font-serif italic"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: (line1Words + line2Words) * wordDelay,
                  ease,
                }}
              >
                Luxury.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <BlurIn delay={0.5} duration={0.6} className="mb-10">
            <p className="text-white/70 text-lg font-normal leading-relaxed max-w-lg">
              Bespoke, handcrafted curtains for Singapore's finest homes.
              From HDB to penthouse — precision-measured, perfectly hung.
            </p>
          </BlurIn>

          {/* CTAs */}
          <BlurIn delay={0.65} duration={0.6}>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#ffffff', color: '#070612' }}
              >
                Book a Free Home Visit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center rounded-full px-7 py-3 text-sm font-medium text-white border border-white/20 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Explore Collections
              </a>
            </div>
          </BlurIn>

        </div>
      </div>
    </section>
  );
}
