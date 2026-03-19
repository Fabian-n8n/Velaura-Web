import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Collections', href: '#collections' },
  { label: 'Process',     href: '#process' },
  { label: 'About',       href: '#features' },
  { label: 'Contact',     href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        backgroundColor: scrolled ? 'rgba(7,6,18,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-lg font-semibold tracking-[0.15em] uppercase text-white">
            Velaura
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mt-0.5 opacity-80"
            style={{ backgroundColor: '#F07030' }}
          />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/55 hover:text-white/90 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200"
          style={{
            border: '1px solid rgba(240,112,48,0.55)',
            color: '#F07030',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(240,112,48,0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Book Consultation
        </a>

      </div>
    </motion.header>
  );
}
