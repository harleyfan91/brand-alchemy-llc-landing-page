import React from 'react';
import { useInViewOnce } from '../utils/useInViewOnce';

const solutions = [
  {
    title: 'Define your brand',
    description:
      'Start with Identity Kit. Answer a focused set of questions and receive your brand voice, visual direction, and a clear starting point — on paper, ready to use.',
  },
  {
    title: 'Get found locally',
    description:
      'Local launch kits for Google and Yelp walk you through setup step by step, with review templates and listing tips built in. Most businesses set this up once and benefit for years.',
  },
  {
    title: 'Show up consistently',
    description:
      'With your brand defined and your listings in place, the hard part is posting and promoting without losing the thread. More tools are coming to make that easier.',
  },
];

const steps = solutions.map((solution, index) => ({
  ...solution,
  step: String(index + 1).padStart(2, '0'),
}));

const Services: React.FC = () => {
  const { ref: sectionRef, hasEntered: motionOn, reduceMotion } = useInViewOnce<HTMLElement>({
    // Delay until the section sits higher in the viewport (tall sections cannot hit a high ratio).
    threshold: 0,
    rootMargin: '0px 0px -32% 0px',
  });

  const motionStyle = (delayMs: number): React.CSSProperties => ({
    transitionDelay: reduceMotion ? '0ms' : `${delayMs}ms`,
  });

  const sectionEnterClass = motionOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3';

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-20 scroll-mt-20 overflow-visible bg-transparent py-6 md:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`ba-section-stack--default mx-auto mb-6 max-w-4xl text-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:mb-8 ${sectionEnterClass}`}
          style={motionStyle(0)}
        >
          <h2 className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-gray-400">System</h2>
          <h3 className="ba-section-display-title font-serif text-4xl font-normal text-gray-900 md:text-5xl">
            Promote your brand like the pros.
          </h3>
          <p className="ba-section-support text-sm font-light leading-relaxed text-gray-500 md:text-base">
            Most cafés, restaurants, and salons already do something worth talking about. What&apos;s missing is a consistent way to show it — a brand voice, a strong listing, and tools that do not require a marketing background.
          </p>
        </div>

        <ol className="mx-auto max-w-5xl">
          {steps.map((solution, i) => {
            const reverse = i % 2 === 1;
            return (
              <li
                key={solution.step}
                className={`py-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:py-4 lg:py-3 ${sectionEnterClass}`}
                style={motionStyle(110 + i * 110)}
              >
                <div className="grid items-center gap-4 md:grid-cols-12 md:gap-10">
                  <div className={`md:col-span-5 ${reverse ? 'md:order-2 md:text-right' : ''}`}>
                    <p className="font-sans text-[5rem] font-bold leading-none text-gray-200 md:text-[7rem]">
                      {solution.step}
                    </p>
                  </div>
                  <div className={`md:col-span-7 ${reverse ? 'md:order-1' : ''}`}>
                    <h5 className="font-serif text-2xl font-normal text-gray-900 md:text-3xl">{solution.title}</h5>
                    <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 md:text-base">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Services;
