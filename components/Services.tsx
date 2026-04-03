import React from 'react';

const solutions = [
  {
    title: "Brand Standards",
    description: "A clear visual identity isn't just for big companies. Our guides help you set consistent standards for how your business looks and communicates, so every touchpoint feels intentional.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    )
  },
  {
    title: "Profile & Search Tools",
    description: "When someone searches for a business like yours, your Google or Yelp profile is what they see first. Our kits walk you through setting it up the right way, so you make a strong first impression every time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699-2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    )
  },
  {
    title: "Ready-to-Use Toolkits",
    description: "Everything laid out in plain steps. Pick what fits your business, follow along, and start seeing results. No marketing experience needed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.625a2.25 2.25 0 00-2.25 2.25m16.5 0V9.45c0-.621-.504-1.125-1.125-1.125h-4.465m4.465 0a2.25 2.25 0 012.25 2.25v.284c0 .568-.46 1.03-1.028 1.03a10.273 10.273 0 01-6.972-2.77c-.412-.374-.412-1.013 0-1.388a10.273 10.273 0 016.972-2.77c.568 0 1.028.462 1.028 1.03v.283zm-9.274 1.28l-.015.015a2.25 2.25 0 01-3.182 0l-.015-.015m0 0a2.25 2.25 0 010-3.182l.015-.015a2.25 2.25 0 013.182 0l.015.015m-3.197 3.197a2.25 2.25 0 003.197-3.197M15.898 20.25a2.25 2.25 0 01-3.182 0l-.015-.015a2.25 2.25 0 010-3.182l.015-.015a2.25 2.25 0 013.182 0l.015.015m-3.197 3.197a2.25 2.25 0 003.197-3.197" />
      </svg>
    )
  }
];

const steps = solutions.map((s, index) => ({
  ...s,
  step: String(index + 1).padStart(2, '0'),
}));

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-transparent relative overflow-visible z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">How it works</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Simple tools. Real results.</h3>
        </div>
      </div>

      {/* One frosted band spanning full width (kept intentionally subtle/transparent) */}
      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div
          className="absolute inset-0 pointer-events-none"
          // Inline styles to guarantee the blur works in dev (Tailwind CDN sometimes misses backdrop-filter utilities).
          style={{
            backgroundColor: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mobile: swipe deck */}
          <div className="md:hidden flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
            {steps.map((s) => (
              <div key={s.step} className="snap-start shrink-0 w-[85%] sm:w-[360px]">
                <div className="px-2">
                  <div className="text-gray-200 text-5xl font-bold leading-none mb-6">{s.step}</div>
                  <h4 className="text-base font-bold text-gray-900 mb-4">{s.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-light text-sm">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 3-up row with arrows between */}
          <div className="hidden md:flex items-start justify-between gap-10">
            {steps.map((s, index) => (
              <React.Fragment key={s.step}>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-200 text-5xl font-bold leading-none mb-6">{s.step}</div>
                  <h4 className="text-base font-bold text-gray-900 mb-4">{s.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-light text-sm">{s.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-10 flex items-center justify-center pt-6 text-gray-300 flex-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
