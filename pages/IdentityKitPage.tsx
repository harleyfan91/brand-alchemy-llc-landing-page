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
    <main className="flex-grow scroll-mt-20 bg-white pt-24 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Brand &amp; voice</p>
        <h1 className="font-serif text-4xl font-normal text-gray-900 md:text-5xl">Identity Kit</h1>
        <p className="mt-5 text-sm font-light leading-relaxed text-gray-500 md:text-base">
          A personalized kit that defines how your business sounds and looks, so you are not starting from a blank page
          every time you write a post, update your site, or brief someone else. Answer a guided set of questions, then
          receive your documents by email.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Core</p>
            <p className="mt-2 font-serif text-3xl font-normal text-gray-900">$49</p>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-gray-600">
              <li>Brand Brief</li>
              <li>Style Guide</li>
              <li>Voice &amp; Content Playbook</li>
              <li>30-Day Quick Start Checklist</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-900 bg-white p-6 text-left shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pro</p>
            <p className="mt-2 font-serif text-3xl font-normal text-gray-900">$99</p>
            <p className="mt-2 text-xs font-light text-gray-500">Everything in Core, plus deeper personalization and a Content Starter Pack.</p>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-gray-600">
              <li>Content Starter Pack (homepage directions, bios, captions, prompts)</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={startUrl}
            {...(sameOrigin ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:w-auto"
          >
            Start my Identity Kit
          </a>
          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-widest text-gray-500 underline-offset-4 transition-colors hover:text-gray-900"
          >
            Back to home
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs font-light leading-relaxed text-gray-400">
          Checkout and delivery run in the secure kit experience. While you are still testing, use Stripe test mode or
          restrict who can reach the start link.
        </p>
      </div>
    </main>
  );
};

export default IdentityKitPage;
