import React from 'react';
import { Link } from 'react-router-dom';
import { useInViewOnce } from '../utils/useInViewOnce';
import { GUIDES_AND_KITS_PATH } from '../content/guidesAndKitsRoutes';
import './product-card-sheen.css';

type Product = {
  eyebrow: string;
  title: string;
  body: string;
  priceLine?: string;
  ctaLabel: string;
  href: string;
  watermarkSrc: string;
  external?: boolean;
  showStartHereTab?: boolean;
};

const START_HERE_TAB_LABEL = 'Start here';

/*
 * ARCHIVED — Camentra iOS app card (removed from homepage Jun 2026).
 * Camentra is paused as an active product recommendation while strategy
 * shifts to Identity Kit + local ranking kits + Daily Execution Engine (DEE).
 * Restore or adapt when Camentra re-enters the product ladder.
 *
 * {
 *   eyebrow: 'iOS App',
 *   title: 'Camentra',
 *   body: 'When you are ready for stronger visuals, Camentra helps you take more polished business photos right from your phone. See the site for current pricing.',
 *   ctaLabel: 'Visit site',
 *   href: 'https://www.camentra.com',
 *   watermarkSrc: '/product-card-watermarks/camentra-lens.png',
 *   external: true,
 * }
 */

const products: Product[] = [
  {
    eyebrow: 'Brand foundation',
    title: 'Identity Kit',
    body: 'A personalized guide that defines your brand voice, look, and next steps, so your website, posts, and marketing stop feeling pieced together.',
    priceLine: '$149',
    ctaLabel: 'Start with Identity Kit',
    href: '/identity-kit',
    watermarkSrc: '/product-card-watermarks/identity-kit-foundation.png',
    showStartHereTab: true,
  },
  {
    eyebrow: 'Local visibility',
    title: 'Local kits',
    body: 'Once your brand is clear, local launch kits for Google and Yelp help you set up and maintain listings that show up when customers search nearby.',
    priceLine: 'Launch kits from $39',
    ctaLabel: 'View local kits',
    href: GUIDES_AND_KITS_PATH,
    watermarkSrc: '/product-card-watermarks/guides-kits-stack.png',
  },
];

const Products = () => {
  const { ref: sectionRef, hasEntered: motionOn, reduceMotion } = useInViewOnce<HTMLElement>({
    threshold: 0,
    rootMargin: '0px 0px -32% 0px',
  });

  const motionStyle = (delayMs: number): React.CSSProperties => ({
    transitionDelay: reduceMotion ? '0ms' : `${delayMs}ms`,
  });

  const sheenStyle = (delayMs: number): React.CSSProperties =>
    reduceMotion ? {} : { animationDelay: `${delayMs}ms` };

  const sectionEnterClass = motionOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3';

  return (
    <section id="products" ref={sectionRef} className="scroll-mt-20 bg-white py-6 md:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div
          className={`relative z-20 mx-auto mb-4 max-w-3xl text-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:mb-6 ${sectionEnterClass}`}
          style={motionStyle(0)}
        >
          <h2 className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Products</h2>
        </div>

        <div className="mx-auto grid max-w-4xl items-stretch gap-4 md:grid-cols-2 lg:gap-5">
          {products.map((product, i) => {
            const showTab = Boolean(product.showStartHereTab);

            const innerCard = (
              <div
                className={`relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[0_16px_40px_-18px_rgba(0,0,0,0.18)] ${
                  showTab
                    ? 'border border-black group-hover:shadow-[0_24px_55px_-22px_rgba(0,0,0,0.22)]'
                    : 'border border-gray-100 group-hover:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.24)]'
                }`}
              >
                {/* Keep watermark opacity very low so texture stays ambient, not dominant. */}
                <img
                  src={product.watermarkSrc}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-[150%] w-[150%] select-none object-cover object-left-top opacity-[0.10] grayscale contrast-170 brightness-75 mix-blend-multiply transition-all duration-500 group-hover:opacity-[0.20] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:mix-blend-normal md:opacity-[0.13] md:group-hover:opacity-[0.24]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-black/[0.015] transition-opacity duration-500"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-slate-500/[0.03] transition-opacity duration-500"
                  aria-hidden
                />
                <span
                  className={`product-card-sheen${motionOn && !reduceMotion ? ' product-card-sheen--play' : ''}`}
                  style={sheenStyle(250 + i * 120)}
                  aria-hidden
                />
                <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-white/50 p-6 transition-colors duration-500 group-hover:bg-white/58 backdrop-blur-[1px] md:p-7">
                  <div className="min-w-0">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">
                      {product.eyebrow}
                    </span>
                    <h4 className="font-serif text-2xl font-normal text-gray-900">{product.title}</h4>
                    <p className="mt-4 text-sm font-light leading-relaxed text-gray-500">{product.body}</p>
                  </div>
                  <div className="mt-auto shrink-0 pt-6">
                    {product.priceLine ? (
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {product.priceLine}
                      </p>
                    ) : null}
                    <span className="w-fit border-b border-black pb-1 text-xs font-bold uppercase tracking-widest text-black">
                      {product.ctaLabel}
                    </span>
                  </div>
                </div>
              </div>
            );

            const cardContent = showTab ? (
              <div className="relative flex min-h-0 flex-1 flex-col pt-6">
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 z-0 h-9 rounded-t-2xl bg-black"
                  aria-hidden
                >
                  <span className="absolute left-1/2 top-1.5 max-w-[calc(100%-1rem)] -translate-x-1/2 truncate whitespace-nowrap px-0.5 text-center text-[8px] font-bold uppercase leading-none tracking-[0.12em] text-white sm:text-[9px] sm:tracking-[0.14em]">
                    {START_HERE_TAB_LABEL}
                  </span>
                </span>
                {innerCard}
              </div>
            ) : (
              innerCard
            );

            const wrapperClasses =
              `group relative z-20 flex h-full min-h-0 flex-col rounded-2xl text-inherit no-underline transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${sectionEnterClass}`;

            const hoverScaleInner = (
              <div className="flex h-full w-full min-h-0 min-w-0 origin-center flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                {cardContent}
              </div>
            );

            if (product.external) {
              return (
                <a
                  key={product.title}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={wrapperClasses}
                  style={motionStyle(110 + i * 110)}
                >
                  {hoverScaleInner}
                </a>
              );
            }

            return (
              <Link
                key={product.title}
                to={product.href}
                className={wrapperClasses}
                style={motionStyle(110 + i * 110)}
              >
                {hoverScaleInner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
