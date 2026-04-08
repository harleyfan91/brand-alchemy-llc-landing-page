import React from 'react';
import { Link } from 'react-router-dom';
import { getIdentityKitStartUrl } from '../utils/identityKitUrls';

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

        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 md:mb-2 md:text-xs md:tracking-[0.3em]">
          Brand &amp; voice
        </p>
        <h1 className="font-serif text-[1.65rem] font-normal leading-tight text-gray-900 sm:text-4xl md:text-5xl">
          Identity Kit
        </h1>
        <p className="mt-3 text-sm font-light leading-snug text-gray-500 md:mt-5 md:text-base md:leading-relaxed">
          A personalized kit that defines how your business sounds and looks, so you are not starting from a blank page
          every time you write a post, update your site, or brief someone else. Answer a guided set of questions, then
          receive your documents by email.
        </p>
      </div>

      <div className="mx-auto mt-5 max-w-2xl px-4 sm:px-6 lg:px-8 md:mt-12">
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-left md:rounded-2xl md:p-6">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 md:text-[10px]">Core</p>
            <p className="mt-1 font-serif text-2xl font-normal text-gray-900 tabular-nums md:mt-2 md:text-3xl">$49</p>
            <ul className="mt-2 space-y-0.5 text-[11px] font-light leading-tight text-gray-600 md:mt-4 md:space-y-2 md:text-sm md:leading-relaxed">
              <li>Brand Brief</li>
              <li>Style Guide</li>
              <li>Voice &amp; Content Playbook</li>
              <li>
                <span className="md:hidden">30-Day Quick Start</span>
                <span className="hidden md:inline">30-Day Quick Start Checklist</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-900 bg-white p-3 text-left shadow-sm md:rounded-2xl md:p-6">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 md:text-[10px]">Pro</p>
            <p className="mt-1 font-serif text-2xl font-normal text-gray-900 tabular-nums md:mt-2 md:text-3xl">$99</p>
            <p className="mt-1.5 text-[10px] font-light leading-tight text-gray-500 md:mt-2 md:text-xs md:leading-normal">
              <span className="md:hidden">Core + Starter Pack &amp; more.</span>
              <span className="hidden md:inline">
                Everything in Core, plus deeper personalization and a Content Starter Pack.
              </span>
            </p>
            <ul className="mt-2 space-y-0.5 text-[11px] font-light leading-tight text-gray-600 md:mt-4 md:space-y-2 md:text-sm md:leading-relaxed">
              <li>
                <span className="md:hidden">Content Starter Pack</span>
                <span className="hidden md:inline">
                  Content Starter Pack (homepage directions, bios, captions, prompts)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex justify-center md:mt-10">
          <a
            href={startUrl}
            {...(sameOrigin ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-black px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 md:px-8 md:py-3.5 md:text-xs"
          >
            Start my Identity Kit
          </a>
        </div>

        <p className="mx-auto mt-4 max-w-xl text-center text-[10px] font-light leading-snug text-gray-400 md:mt-8 md:text-xs md:leading-relaxed">
          Checkout and delivery run in the secure kit experience. While you are still testing, use Stripe test mode or
          restrict who can reach the start link.
        </p>
      </div>
    </main>
  );
};

export default IdentityKitPage;
