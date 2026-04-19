import React from 'react';
import { useInViewOnce } from '../utils/useInViewOnce';

const solutions = [
  {
    title: 'Create your brand identity guide',
    description:
      'Start with Identity Kit so your voice, look, and direction are clear before you make more marketing decisions.',
  },
  {
    title: 'Choose the tools you need',
    description:
      'Pick easy-to-use content packs, setup guides, and practical resources that match your business and your pace.',
  },
  {
    title: 'Promote with confidence',
    description:
      'Show up more consistently online, save time, and spend less energy second-guessing what to say or make next.',
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
            Most small businesses do not need more marketing noise. They need a clear brand identity and
            easy-to-use tools, so they can show up consistently.
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
