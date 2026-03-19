import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { FadeUp } from '@/components/ui/animations';

const LINKS = {
  Collections: ['Blackout', 'Sheer', 'Motorised', 'Linen', 'Velvet', 'S-Fold'],
  Services: ['Home Consultation', 'Measurement', 'Installation', 'Smart Integration', 'After-Sales'],
  Company: ['About Us', 'Our Craftsmen', 'Sustainability', 'Careers', 'Press'],
};

export default function Footer() {
  return (
    <footer
      className="py-16 lg:py-20"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <FadeUp>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base font-semibold tracking-[0.15em] uppercase text-white">
                  Velaura
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#F07030' }}
                />
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
                Singapore's premier curtain atelier. Bespoke window treatments
                crafted for the way you live.
              </p>
              <p className="text-white/30 text-sm">
                30 Prinsep Street, #03-10<br />
                Singapore 188647
              </p>
              <p className="text-white/30 text-sm mt-1">
                hello@velaura.sg · +65 9123 4567
              </p>
            </FadeUp>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items], gi) => (
            <div key={heading}>
              <FadeUp delay={gi * 0.07}>
                <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">
                  {heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white/45 hover:text-white/70 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Velaura Pte. Ltd. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-5">
            {[
              { icon: Instagram,      label: 'Instagram' },
              { icon: Facebook,       label: 'Facebook' },
              { icon: MessageCircle,  label: 'WhatsApp' },
            ].map(({ icon: Icon, label }) => (
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
