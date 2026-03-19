import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/collections';

const ease = [0.22, 1, 0.36, 1];

const NAV_LINKS = [
  { label: 'Process', href: '/process', router: true },
  { label: 'About',   href: '/about',   router: true },
];

function CollectionsDropdown({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute top-full mt-3 z-50"
          style={{ width: 520, left: '50%', transform: 'translateX(-48%)' }}
          initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.22, ease }}
        >
          <div
            className="rounded-2xl p-3"
            style={{
              background: 'rgba(10,9,24,0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            <div className="grid grid-cols-3 gap-2">
              {COLLECTIONS.map((col) => (
                <Link
                  key={col.slug}
                  to={`/collections/${col.slug}`}
                  className="group rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="relative h-16 w-full overflow-hidden"
                    style={{ background: col.gradient }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          90deg,
                          rgba(255,255,255,0.018) 0px,
                          rgba(255,255,255,0.018) 1px,
                          transparent 1px,
                          transparent 14px
                        )`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse 80% 80% at 30% 60%, ${col.shimmer} 0%, transparent 70%)`,
                      }}
                    />
                    <span className="absolute top-2 left-2.5 text-[9px] tracking-[0.2em] text-white/30">{col.id}</span>
                    <div
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'rgba(255,255,255,0.12)' }}
                    >
                      <ArrowUpRight size={9} className="text-white" />
                    </div>
                  </div>
                  <div className="px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-xs font-semibold text-white/85 group-hover:text-white transition-colors mb-0.5">{col.name}</p>
                    <p className="text-[10px] text-white/35 leading-tight">{col.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div
              className="mt-2 pt-3 px-1 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase">6 Collections</span>
              <Link
                to="/#collections"
                className="text-[10px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
              >
                View all <ArrowUpRight size={9} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDropdown  = () => { clearTimeout(closeTimer.current); setDropdownOpen(true); };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 180); };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        backgroundColor: scrolled ? 'rgba(7,6,18,0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-lg font-semibold tracking-[0.15em] uppercase text-white">Velaura</span>
          <span className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ backgroundColor: '#F07030' }} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <button
              className="flex items-center gap-1 text-sm transition-colors duration-200"
              style={{ color: dropdownOpen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)' }}
            >
              Collections
              <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={13} />
              </motion.span>
            </button>
            <CollectionsDropdown open={dropdownOpen} />
          </div>

          {NAV_LINKS.map(({ label, href, router }) => (
            router
              ? <Link key={label} to={href} className="text-sm text-white/55 hover:text-white/90 transition-colors duration-200">{label}</Link>
              : <a    key={label} href={href} className="text-sm text-white/55 hover:text-white/90 transition-colors duration-200">{label}</a>
          ))}
        </nav>

        <a
          href="/book"
          className="hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#F07030' }}
        >
          Book Consultation
        </a>

      </div>
    </motion.header>
  );
}
