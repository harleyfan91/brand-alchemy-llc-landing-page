import React from 'react';
import CheckIcon from './CheckIcon';
import ProFeatureSparkIcon from './ProFeatureSparkIcon';

export type MarketingComparisonCard = {
  name: string;
  price: string;
  summary: string;
  features: string[];
  emphasis?: boolean;
  tabLabel?: string;
  icon?: 'check' | 'spark';
};

type Props = {
  intro?: string;
  cards: MarketingComparisonCard[];
};

/**
 * Offer-page comparison primitive: marketing-first, not interactive.
 * Use for pages where visitors compare packages before entering a separate flow.
 */
const MarketingComparisonCards: React.FC<Props> = ({ intro, cards }) => {
  return (
    <section aria-label="Identity Kit comparison">
      {intro ? <p className="mx-auto max-w-xl text-center text-sm font-light leading-relaxed text-gray-600">{intro}</p> : null}

      <div className={`${intro ? 'mt-5' : ''} space-y-3 md:grid md:grid-cols-2 md:gap-5 md:space-y-0`}>
        {cards.map((card) => (
          <div key={card.name} className="relative pt-4">
            {card.tabLabel ? (
              <span className="pointer-events-none absolute inset-x-0 top-0 z-0 h-9 rounded-t-2xl bg-black" aria-hidden>
                <span className="absolute left-1/2 top-1.5 -translate-x-1/2 whitespace-nowrap px-0.5 text-[8px] font-bold uppercase leading-none tracking-[0.12em] text-white">
                  {card.tabLabel}
                </span>
              </span>
            ) : null}

            <article
              className={`relative z-10 rounded-2xl border bg-white p-5 text-left ${
                card.emphasis ? 'border-black shadow-[0_16px_40px_-18px_rgba(0,0,0,0.18)]' : 'border-gray-200'
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
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketingComparisonCards;
