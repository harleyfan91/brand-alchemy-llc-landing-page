import React from 'react';
import { Link } from 'react-router-dom';
import MarketingComparisonCards from '../components/MarketingComparisonCards';
import type { MarketingComparisonCard } from '../components/MarketingComparisonCards';
import { getIdentityKitStartUrl } from '../utils/identityKitUrls';

/**
 * Core tier PDFs — aligned with `identity-kit/apps/web/src/data/tiers.ts` (core bullets).
 */
const CORE_DELIVERABLES = [
  'Brand Brief',
  'Style Guide',
  'Voice & Content Playbook',
  '30-Day Quick Start Checklist',
] as const;

/**
 * Pro-only additions — aligned with `identity-kit/apps/web/src/data/tiers.ts` (pro bullets).
 */
const PRO_ADD_ONS = [
  'Custom brand summary for your marketing materials',
  'Content Starter Pack',
  'Homepage messaging directions',
  'Social bio options',
  'Caption and content prompts',
  'CTA language suggestions',
] as const;

const comparisonCards: MarketingComparisonCard[] = [
  {
    name: 'Pro',
    price: '$99',
    tabLabel: 'AI Enhanced',
    emphasis: true,
    icon: 'spark',
    summary:
      'Our flagship kit for a more tailored brand foundation, plus extra content and messaging tools for day-to-day use.',
    features: [PRO_ADD_ONS[0], PRO_ADD_ONS[1], PRO_ADD_ONS[2], PRO_ADD_ONS[4]],
  },
  {
    name: 'Core',
    price: '$49',
    icon: 'check',
    summary: 'A clear brand foundation with practical documents and next steps you can use right away.',
    features: [...CORE_DELIVERABLES],
  },
] as const;

/**
 * Dedicated Identity Kit offer page on the main domain (`/identity-kit`).
 * Intake app remains in the `identity-kit` repo; CTA uses `getIdentityKitStartUrl()`.
 */
const IdentityKitPage: React.FC = () => {
  const startUrl = getIdentityKitStartUrl();
  const openKitInNewTab =
    typeof window !== 'undefined' &&
    (() => {
      try {
        return new URL(startUrl, window.location.href).origin !== window.location.origin;
      } catch {
        return true;
      }
    })();

  return (
    <main className="flex-grow scroll-mt-20 bg-white pb-10 pt-20 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-5">
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 md:text-xs md:tracking-[0.2em]">
            <li>
              <Link to="/" className="text-gray-500 transition-colors hover:text-gray-900">
                Home
              </Link>
            </li>
            <li aria-hidden className="select-none text-gray-300">
              /
            </li>
            <li className="text-gray-900" aria-current="page">
              Identity Kit
            </li>
          </ol>
        </nav>

        <h1 className="font-sans text-2xl font-bold uppercase leading-[1.1] tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block">Build your brand kit</span>
          <span className="mt-0.5 block text-gray-500 sm:mt-1">In minutes</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
          The kit helps define how your brand sounds and looks so you can show up consistently, without starting from
          scratch every time you write, update your site, or post. Take a short guided quiz to unlock your brand&apos;s
          identity.
        </p>
      </div>

      <div className="mx-auto mt-7 max-w-2xl px-4 sm:px-6 lg:px-8 md:mt-12">
        <MarketingComparisonCards cards={comparisonCards} />

        <div className="mt-6 flex justify-center md:mt-8">
          <a
            href={startUrl}
            {...(openKitInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:px-10 sm:py-4 sm:text-sm"
          >
            Start my Identity Kit
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-[10px] font-light leading-snug text-gray-400 md:mt-8 md:text-xs md:leading-relaxed">
          Checkout and delivery run in the secure kit experience. While you are still testing, use Stripe test mode or
          restrict who can reach the start link.
        </p>
      </div>
    </main>
  );
};

export default IdentityKitPage;
