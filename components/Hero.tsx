import React from 'react';
import { scrollToSection } from '../utils/scrollToSection';

const Hero: React.FC = () => {
  const scrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('services');
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-[100svh] flex-col justify-start overflow-hidden bg-white pt-24 pb-8 md:min-h-[90vh] md:justify-center md:pt-16 md:pb-12"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-gray-50 to-white opacity-60 blur-3xl" />
      </div>

      {/* Maintained relative z-20 so your text sits securely above the background graphics */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 text-center">
        {/* Floating Dictionary Definition */}
        <div className="mb-4 text-xs font-serif italic leading-snug tracking-normal text-gray-500 normal-case md:mb-10 md:text-sm">
          <span className="font-semibold text-gray-700">alchemy</span>
          <span className="font-normal text-gray-400">
            {' '}
            al·che·my (n.): a seemingly magical process of transformation, creation, or combination
          </span>
        </div>

        {/* Headline: mobile large enough to lead; still steps up on md+ */}
        <h1 className="mb-5 text-3xl font-bold uppercase leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:mb-8 md:text-5xl md:leading-[1.1] lg:text-6xl xl:text-7xl">
          <span className="md:hidden">
            Turn your brand
            <br />
            into one
            <br />
            people remember.
          </span>
          <span className="hidden md:block">
            Turn your brand into
            <br />
            one people remember.
          </span>
          {/* Mobile: first chunk is inline (needs a break). Desktop: chunk is md:block, so an extra br would add a blank line. */}
          <br className="md:hidden" aria-hidden />
          <span className="text-gray-300">Brand Alchemy</span>
          <br />
          <span className="text-gray-500">gets you there fast.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl px-1 text-base font-light leading-relaxed text-gray-500 md:mb-16 md:text-xl">
          Tools, templates, and step-by-step guides for people building something of their own, so you can show up consistently
          and reach more customers without hiring a marketing team.
        </p>

        <div className="flex justify-center">
          <a
            href="#services"
            onClick={scrollToSolutions}
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900 md:gap-2.5 md:text-xs"
          >
            <span>See the approach</span>
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
      </div>
    </section>
  );
};

export default Hero;
