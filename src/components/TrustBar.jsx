import { FadeUp } from '@/components/ui/animations';

const STATS = [
  { value: '2,400+', label: 'Homes Styled' },
  { value: '15',     label: 'Years of Craft' },
  { value: '500+',   label: 'Premium Fabrics' },
  { value: '100%',   label: 'Custom-Made' },
  { value: '5-Year', label: 'Workmanship Warranty' },
];

export default function TrustBar() {
  return (
    <section className="relative py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="text-center mb-10">
          <p className="text-xs tracking-[0.22em] uppercase text-white/35">
            Trusted by Singapore's most discerning homes since 2010
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px"
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {STATS.map(({ value, label }, i) => (
            <FadeUp
              key={label}
              delay={i * 0.07}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span className="text-3xl font-semibold text-white tracking-tight mb-1">
                {value}
              </span>
              <span className="text-xs text-white/40 text-center">
                {label}
              </span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
