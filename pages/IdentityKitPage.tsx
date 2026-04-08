import React from 'react';
import { Link } from 'react-router-dom';
import CatalogStyleTierCards from '../components/CatalogStyleTierCards';
import type { TierContent } from '../components/CatalogStyleTierCards';
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

const coreTier: TierContent = {
  price: '$49',
  features: [...CORE_DELIVERABLES],
};

/** Pro card lists everything you get (Core + Pro), with a divider before Pro-only lines — same idea as `TierSelector` when Pro is selected. */
const proTier: TierContent = {
  price: '$99',
  dividerBeforeFeatureIndex: CORE_DELIVERABLES.length,
  features: [...CORE_DELIVERABLES, ...PRO_ADD_ONS],
};

const kitCtaClassName =
  'inline-flex w-full max-w-md items-center justify-center rounded-full bg-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:px-10 sm:py-4 sm:text-sm';

/**
 * Dedicated Identity Kit offer page on the main domain (`/identity-kit`).
 * Intake app remains in the `identity-kit` repo; CTA uses `getIdentityKitStartUrl()`.
 */
const IdentityKitPage: React.FC = () => {
  const startUrl = getIdentityKitStartUrl();
  const sameOrigin =
    typeof window !== 'undefined' &&
    (() => {
      try {
        return new URL(startUrl, window.location.href).origin === window.location.origin;
      } catch {
        return false;
      }
    })();

  const cta = (className?: string) => (
    <a
      href={startUrl}
      {...(sameOrigin ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className={className ?? kitCtaClassName}
    >
      Start my Identity Kit
    </a>
  );

  return (
    <main className="flex-grow scroll-mt-20 bg-white pt-20 pb-8 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-3 md:mb-6">
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

        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 md:text-xs md:tracking-[0.3em]">
          Brand &amp; voice
        </p>

        {/* Bold sans hero — energy from `identity-kit` TierSelector; wording tuned for marketing site */}
        <h1 className="font-sans text-2xl font-bold uppercase leading-[1.1] tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block">Build your brand kit</span>
          <span className="mt-0.5 block text-gray-500 sm:mt-1">Voice, look, and next steps</span>
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-gray-600 sm:mt-4 sm:text-base">
          Our kits help define how you sound and look so you can show up consistently—without starting from scratch every
          time you write, update your site, or brief someone else. Answer a guided flow, then receive your documents by
          email.
        </p>

        <div className="mt-6 flex justify-center sm:mt-8">{cta()}</div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:px-8 md:mt-12">
        <CatalogStyleTierCards core={coreTier} pro={proTier} order="pro-first" />

        <div className="mt-8 flex justify-center md:mt-10">{cta(kitCtaClassName + ' max-w-md')}</div>

        <p className="mx-auto mt-6 max-w-xl text-center text-[10px] font-light leading-snug text-gray-400 md:mt-8 md:text-xs md:leading-relaxed">
          Checkout and delivery run in the secure kit experience. While you are still testing, use Stripe test mode or
          restrict who can reach the start link.
        </p>
      </div>
    </main>
  );
};

export default IdentityKitPage;
