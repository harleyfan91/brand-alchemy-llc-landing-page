import React, { useEffect, useState } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import './hero-brand-shine.css';

/** Vertical stagger (seconds) — definition → headline → body + CTA */
const STAGGER_S = [0, 0.48, 0.96] as const;
const INTRO_BLOCK_DURATION_MS = 900;

/** Document scroll distance (px) over which hero copy goes from fully visible → hidden */
const SCROLL_FADE_RANGE_PX = 440;

/** Below this scroll-driven visibility, treat hero copy as non-interactive */
const SCROLL_INTERACTION_CUTOFF = 0.08;

/** After intro completes, wait before the one-shot dark sweep on “Brand Alchemy” */
const SHINE_DELAY_AFTER_INTRO_MS = 320;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollYToReveal = (scrollY: number): number => {
  const t = scrollY / SCROLL_FADE_RANGE_PX;
  return 1 - Math.min(Math.max(t, 0), 1);
};

const Hero: React.FC = () => {
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion);
  const [introOn, setIntroOn] = useState(prefersReducedMotion);
  const [introComplete, setIntroComplete] = useState(prefersReducedMotion);
  const [scrollReveal, setScrollReveal] = useState(1);
  const [brandShineOn, setBrandShineOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);


  useEffect(() => {
    if (reduceMotion) {
      setIntroOn(true);
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIntroOn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setIntroComplete(true);
      return;
    }
    const lastStaggerMs = Math.max(...STAGGER_S) * 1000;
    const t = window.setTimeout(() => setIntroComplete(true), lastStaggerMs + INTRO_BLOCK_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (!introComplete) return;

    const onScroll = () => {
      setScrollReveal(scrollYToReveal(window.scrollY));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [introComplete]);

  useEffect(() => {
    if (!introComplete || reduceMotion) return;
    const t = window.setTimeout(() => setBrandShineOn(true), SHINE_DELAY_AFTER_INTRO_MS);
    return () => window.clearTimeout(t);
  }, [introComplete, reduceMotion]);

  const scrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('services');
  };

  const blockStyle = (index: 0 | 1 | 2): React.CSSProperties => {
    if (reduceMotion) {
      return { transitionDelay: '0ms' };
    }
    return { transitionDelay: `${STAGGER_S[index] * 1000}ms` };
  };

  const blockClass = (index: 0 | 1 | 2) => {
    const duration = reduceMotion ? 'duration-0' : `duration-[${INTRO_BLOCK_DURATION_MS}ms]`;
    const easing = 'ease-[cubic-bezier(0.25,0.46,0.45,0.94)]';

    if (!introOn) {
      return [
        duration,
        easing,
        'transition-[opacity,filter,transform]',
        reduceMotion ? 'opacity-100' : 'opacity-0 blur-xl translate-y-2',
      ].join(' ');
    }

    return [
      duration,
      easing,
      'transition-[opacity,filter,transform]',
      'opacity-100 blur-0 translate-y-0',
    ].join(' ');
  };

  const scrollMuted = introComplete && scrollReveal < SCROLL_INTERACTION_CUTOFF;
  const blurPx = reduceMotion ? 0 : (1 - scrollReveal) * 11;

  const scrollLayerStyle: React.CSSProperties = introComplete
    ? {
        opacity: scrollReveal,
        filter: blurPx > 0.01 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
        transition: 'none',
      }
    : {
        opacity: 1,
        transition: 'none',
      };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white pt-24 pb-8 md:min-h-[90vh] md:pt-16 md:pb-12"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-gray-50 to-white opacity-60 blur-3xl" />
      </div>

      <div
        className={`relative z-20 mx-auto w-full max-w-5xl px-4 text-center ${scrollMuted ? 'pointer-events-none' : ''}`}
        style={scrollLayerStyle}
        aria-hidden={scrollMuted}
      >
        <div className={blockClass(0)} style={blockStyle(0)}>
          <div className="mb-4 text-[clamp(0.82rem,2.2vw,0.95rem)] font-serif italic leading-snug tracking-normal text-gray-500 normal-case md:mb-10 md:text-sm">
            <span className="font-semibold text-gray-700">alchemy</span>
            <span className="font-normal text-gray-400">
              {' '}
              al·che·my (n.): a seemingly magical process of transformation, creation, or combination
            </span>
          </div>
        </div>

        <div className={blockClass(1)} style={blockStyle(1)}>
          <h1 className="mb-5 text-[clamp(2rem,8.4vw,2.4rem)] font-bold uppercase leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:mb-8 md:text-5xl md:leading-[1.1] lg:text-6xl xl:text-7xl">
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
            <br className="md:hidden" aria-hidden />
            <span className="hero-brand-shine">
              <span className="text-gray-300">Brand Alchemy</span>
              {brandShineOn ? (
                <span
                  className="hero-brand-shine__gloss hero-brand-shine__gloss--play"
                  aria-hidden
                  onAnimationEnd={(e) => {
                    if (!e.animationName.includes('hero-brand-dark-sweep')) return;
                    setBrandShineOn(false);
                  }}
                >
                  Brand Alchemy
                </span>
              ) : null}
            </span>
            <br />
            <span className="text-gray-500">gets you there fast.</span>
          </h1>
        </div>

        <div className={blockClass(2)} style={blockStyle(2)}>
          <p className="mx-auto mb-8 max-w-2xl px-1 text-[clamp(1.02rem,4.2vw,1.15rem)] font-light leading-relaxed text-gray-500 md:mb-16 md:text-xl">
            Tools, templates, and step-by-step guides for people building something of their own, so you can show up
            consistently and reach more customers without hiring a marketing team.
          </p>

          <div className="flex justify-center">
            <a
              href="#services"
              onClick={scrollToSolutions}
              tabIndex={scrollMuted ? -1 : undefined}
              className="group inline-flex items-center gap-2 text-[clamp(0.72rem,2.7vw,0.8rem)] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900 md:gap-2.5 md:text-xs"
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
      </div>
    </section>
  );
};

export default Hero;
