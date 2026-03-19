import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeUp } from '@/components/ui/animations';

const COLLECTIONS_LINKS = [
  { label: 'Blackout',   to: '/collections/blackout'   },
  { label: 'Sheer',      to: '/collections/sheer'      },
  { label: 'Motorised',  to: '/collections/motorised'  },
  { label: 'Linen',      to: '/collections/linen'      },
  { label: 'Velvet',     to: '/collections/velvet'     },
  { label: 'S-Fold',     to: '/collections/s-fold'     },
];

const SERVICES_LINKS = [
  { label: 'Book Consultation',  to: '/book'                       },
  { label: 'Our Process',        to: '/process'                    },
  { label: 'Smart Integration',  to: '/collections/motorised'      },
  { label: 'After-Sales Care',   to: '/about'                      },
];

const COMPANY_LINKS = [
  { label: 'About Us',       to: '/about'   },
  { label: 'Our Team',       to: '/about'   },
  { label: 'Sustainability', to: '/about'   },
  { label: 'Careers',        href: '#'      },
  { label: 'Press',          href: '#'      },
];

function FooterLink({ item }) {
  const cls = 'text-sm text-white/45 hover:text-white/70 transition-colors';
  if (item.to) return <Link to={item.to} className={cls}>{item.label}</Link>;
  return <a href={item.href ?? '#'} className={cls}>{item.label}</a>;
}

export default function Footer() {
  return (
    <footer
      className="py-16 lg:py-20"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <FadeUp>
              <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
                <span className="text-base font-semibold tracking-[0.15em] uppercase text-white">
                  Velaura
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F07030' }} />
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
                Singapore's premier curtain atelier. Bespoke window treatments
                crafted for the way you live.
              </p>
              <p className="text-white/28 text-sm leading-relaxed">
                30 Prinsep Street, #03-10<br />
                Singapore 188647
              </p>
              <p className="text-white/28 text-sm mt-1">
                hello@velaura.sg · +65 9123 4567
              </p>
            </FadeUp>
          </div>

          {/* Collections */}
          <div>
            <FadeUp delay={0.07}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">Collections</p>
              <ul className="flex flex-col gap-3">
                {COLLECTIONS_LINKS.map(item => (
                  <li key={item.label}><FooterLink item={item} /></li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Services */}
          <div>
            <FadeUp delay={0.14}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">Services</p>
              <ul className="flex flex-col gap-3">
                {SERVICES_LINKS.map(item => (
                  <li key={item.label}><FooterLink item={item} /></li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Company */}
          <div>
            <FadeUp delay={0.21}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">Company</p>
              <ul className="flex flex-col gap-3">
                {COMPANY_LINKS.map(item => (
                  <li key={item.label}><FooterLink item={item} /></li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Velaura Pte. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { Icon: Instagram,     label: 'Instagram' },
              { Icon: Facebook,      label: 'Facebook'  },
              { Icon: MessageCircle, label: 'WhatsApp'  },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
