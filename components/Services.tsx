import React, { useEffect, useRef, useState } from 'react';
import { scrollToSection } from '../utils/scrollToSection';

const solutions = [
  {
    title: "Brand Standards",
    description:
      "Looking put-together shouldn't require a design team. Our guides help you define how your business looks and sounds, so every post, message, and first impression feels like it belongs together.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    )
  },
  {
    title: "Get Found",
    description:
      "Your online presence is often the first impression someone has of you. Our kits help you set it up right, so when people are looking for what you offer, they find you and feel confident reaching out.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699-2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    )
  },
  {
    title: "Ready-to-Use Toolkits",
    description:
      "No marketing background needed. Pick the kit that fits your situation, follow the steps, and start showing up the way you mean to. Built for people who are doing it themselves.",
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
  const mobileDeckRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const root = mobileDeckRef.current;
    if (!root) return;
    const slides = root.querySelectorAll('[data-solution-slide]');
    if (slides.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx = 0;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const idx = Number((entry.target as HTMLElement).dataset.solutionSlide);
            if (!Number.isNaN(idx)) bestIdx = idx;
          }
        }
        if (bestRatio > 0) setActiveSlide(bestIdx);
      },
      { root, rootMargin: '0px', threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    slides.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('products');
  };

  return (
    <section
      id="services"
      className="relative z-20 scroll-mt-20 overflow-visible bg-transparent py-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center md:mb-16">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">
            The approach
          </h2>
          <h3 className="font-serif text-4xl text-gray-900 md:text-5xl">Simple tools. Real results.</h3>
        </div>
      </div>

      {/* One frosted band spanning full width (kept intentionally subtle/transparent) */}
      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div
          className="absolute inset-0 pointer-events-none"
          // Inline styles to guarantee the blur works in dev (Tailwind CDN sometimes misses backdrop-filter utilities).
          style={{
            backgroundColor: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-16 lg:px-8">
          {/* Mobile: horizontal deck + minimal dots (replaces edge gradients) */}
          <div className="md:hidden">
            <div
              ref={mobileDeckRef}
              className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  data-solution-slide={i}
                  className="snap-start shrink-0 w-[85%] sm:w-[360px]"
                >
                  <div className="px-2">
                    <div className="text-gray-200 text-5xl font-bold leading-none mb-6">{s.step}</div>
                    <h4 className="text-base font-bold text-gray-900 mb-4">{s.title}</h4>
                    <p className="text-gray-500 leading-relaxed font-light text-sm">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span
                  key={s.step}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                    i === activeSlide ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
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

      <div className="mx-auto mt-8 flex max-w-7xl justify-center px-4 sm:px-6 md:mt-12 lg:px-8">
        <a
          href="#products"
          onClick={scrollToProducts}
          className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900 md:gap-2.5 md:text-xs"
        >
          <span>See the toolkit</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-y-0.5 md:h-5 md:w-5"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Services;
