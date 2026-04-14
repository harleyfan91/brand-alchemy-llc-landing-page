import React from 'react';
import CheckIcon from './CheckIcon';
import ProFeatureSparkIcon from './ProFeatureSparkIcon';

export type MarketingComparisonCard = {
  name: string;
  price: string;
  summary: string;
  features: string[];
  emphasis?: boolean;
  /** Peek tab behind the card (selector only). See BRAND_GUIDELINES — e.g. “AI Enhanced” on Pro. */
  tabLabel?: string;
  icon?: 'check' | 'spark';
  ctaLabel?: string;
  ctaHref?: string;
  ctaOpenInNewTab?: boolean;
};

type Props = {
  intro?: string;
  cards: MarketingComparisonCard[];
  variant?: 'lander' | 'selector';
};

/**
 * Offer-page comparison: `selector` uses full card chrome + optional peek tab; `lander` is open / editorial.
 */
const MarketingComparisonCards: React.FC<Props> = ({ intro, cards, variant = 'selector' }) => {
  const isSelector = variant === 'selector';
  const isLander = variant === 'lander';

  return (
    <section aria-label="Identity Kit comparison">
      {intro ? <p className="mx-auto max-w-xl text-center text-sm font-light leading-relaxed text-gray-600">{intro}</p> : null}

      <div
        className={`${intro ? 'mt-5' : ''} space-y-8 md:space-y-0 ${
          isLander ? 'md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-0' : 'space-y-3 md:grid md:grid-cols-2 md:gap-5 md:space-y-0'
        }`}
      >
        {cards.map((card, index) => {
          const showPeekTab = isSelector && Boolean(card.tabLabel);
          const isLast = index === cards.length - 1;

          return (
            <div
              key={card.name}
              className={`relative ${showPeekTab ? 'pt-4' : ''} ${
                isLander
                  ? `pb-8 md:pb-0 ${!isLast ? 'border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-100 md:pr-10' : ''}`
                  : ''
              }`}
            >
              {showPeekTab ? (
                <span className="pointer-events-none absolute inset-x-0 top-0 z-0 h-9 rounded-t-2xl bg-black" aria-hidden>
                  <span className="absolute left-1/2 top-1.5 -translate-x-1/2 whitespace-nowrap px-0.5 text-[8px] font-bold uppercase leading-none tracking-[0.12em] text-white">
                    {card.tabLabel}
                  </span>
                </span>
              ) : null}

              <article
                className={`text-left ${
                  isSelector
                    ? `relative z-10 rounded-2xl border bg-white p-5 ${
                        card.emphasis
                          ? 'border-black shadow-[0_16px_40px_-18px_rgba(0,0,0,0.18)]'
                          : 'border-gray-200'
                      }`
                    : 'relative rounded-none border-0 bg-transparent p-0 shadow-none'
                }`}
              >
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 sm:text-base">{card.name}</h2>
                  <span className="shrink-0 text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">{card.price}</span>
                </div>

                <p className="mt-3 text-sm font-light leading-relaxed text-gray-600">{card.summary}</p>

                <ul className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">
                  {card.features.map((feature) => (
                    <li key={`${card.name}-${feature}`} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 shrink-0 ${card.icon === 'spark' ? 'text-gray-900' : 'text-gray-500'}`}>
                        {card.icon === 'spark' ? <ProFeatureSparkIcon /> : <CheckIcon size="md" />}
                      </span>
                      <span className="text-sm font-normal leading-snug text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {card.ctaLabel && card.ctaHref ? (
                  <div className="mt-5">
                    <a
                      href={card.ctaHref}
                      {...(card.ctaOpenInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                        isSelector
                          ? card.emphasis
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'border border-gray-300 bg-white text-gray-900 hover:border-black'
                          : 'border border-gray-300 bg-white text-gray-900 hover:border-black'
                      }`}
                    >
                      {card.ctaLabel}
                    </a>
                  </div>
                ) : null}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MarketingComparisonCards;
