import React from 'react';
import { Link } from 'react-router-dom';
import MarketingComparisonCards from '../components/MarketingComparisonCards';
import { identityKitComparisonCards } from '../content/identityKit';
import { getIdentityKitTierStartUrl, isExternalToCurrentOrigin } from '../utils/identityKitUrls';

const IdentityKitSelectorPage: React.FC = () => {
  const coreStartUrl = getIdentityKitTierStartUrl('core');
  const proStartUrl = getIdentityKitTierStartUrl('pro');

  const selectorCards = identityKitComparisonCards.map((card) => {
    const href = card.name === 'Core' ? coreStartUrl : proStartUrl;
    return {
      ...card,
      ctaHref: href,
      ctaLabel: card.name === 'Core' ? 'Choose Core' : 'Choose Pro',
      ctaOpenInNewTab: isExternalToCurrentOrigin(href),
    };
  });

  return (
    <main className="flex-grow scroll-mt-20 bg-white pb-10 pt-20 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-5">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 md:text-xs md:tracking-[0.2em]">
            <li>
              <Link to="/" className="text-gray-500 transition-colors hover:text-gray-900">
                Home
              </Link>
            </li>
            <li aria-hidden className="select-none text-gray-300">
              /
            </li>
            <li>
              <Link to="/identity-kit" className="text-gray-500 transition-colors hover:text-gray-900">
                Identity Kit
              </Link>
            </li>
            <li aria-hidden className="select-none text-gray-300">
              /
            </li>
            <li className="text-gray-900" aria-current="page">
              Choose your kit
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-sans text-2xl font-bold uppercase leading-[1.1] tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Choose the Identity Kit
            <span className="mt-1 block text-gray-500">that fits your business best</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
            Both versions give you a clear brand foundation. Choose Core if you want the essentials on paper, or Pro if
            you want more tailored guidance and extra messaging support built in.
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-2xl md:mt-12">
          <MarketingComparisonCards variant="selector" cards={selectorCards} />

          <p className="mx-auto mt-6 max-w-xl text-center text-[10px] font-light leading-snug text-gray-400 md:mt-8 md:text-xs md:leading-relaxed">
            Checkout and delivery run in the secure kit experience. Use Stripe test mode or restrict the start links
            while you are still testing.
          </p>
        </div>
      </div>
    </main>
  );
};

export default IdentityKitSelectorPage;
