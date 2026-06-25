import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '../components/CheckIcon';
import ProFeatureSparkIcon from '../components/ProFeatureSparkIcon';
import {
  IDENTITY_KIT_BADGE,
  IDENTITY_KIT_FOUNDATION_DELIVERABLES,
  IDENTITY_KIT_MESSAGING_DELIVERABLES,
  IDENTITY_KIT_OUTCOMES,
  IDENTITY_KIT_PRICE,
  IDENTITY_KIT_PROCESS_STEPS,
  IDENTITY_KIT_VALUE_POINTS,
} from '../content/identityKit';
import { getIdentityKitStartUrl, isExternalToCurrentOrigin } from '../utils/identityKitUrls';

/** Wide shallow arc: each sheet’s bottom-center pivot sits on a horizontal baseline (spread in `rem`), then rotates. */
const KIT_PAPER_FAN_PIVOT_REM = 6.25;
const KIT_PAPER_FAN_ROTATE_DEG = 10;

const checkoutUrl = getIdentityKitStartUrl();
const checkoutOpensNewTab = isExternalToCurrentOrigin(checkoutUrl);

const primaryCtaClassName =
  'inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:px-10 sm:py-4 sm:text-sm';

const IdentityKitCta: React.FC<{ className?: string; children: React.ReactNode; variant?: 'primary' | 'inverse' }> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  const inverseClassName =
    'inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors hover:bg-gray-100 sm:px-10 sm:py-4 sm:text-sm';
  const combined = `${variant === 'inverse' ? inverseClassName : primaryCtaClassName} ${className}`.trim();

  if (checkoutOpensNewTab) {
    return (
      <a href={checkoutUrl} className={combined} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a href={checkoutUrl} className={combined}>
      {children}
    </a>
  );
};

const IdentityKitPage: React.FC = () => {
  return (
    <main className="relative z-20 flex-grow scroll-mt-20 bg-white pb-12 pt-20 md:pb-20 md:pt-28">
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
            <li className="text-gray-900" aria-current="page">
              Identity Kit
            </li>
          </ol>
        </nav>

        <section className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 sm:text-xs">{IDENTITY_KIT_BADGE}</p>
          <h1 className="mt-3 font-sans text-3xl font-bold uppercase leading-[1.02] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Stop guessing how your business
            <span className="mt-1 block text-gray-500">should sound and look</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
            The Identity Kit gives you your brand voice, visual direction, and personalized messaging on paper — so your
            website, posts, and marketing stop feeling pieced together.
          </p>
          <div className="mt-8 flex justify-center">
            <IdentityKitCta>Start your Identity Kit — {IDENTITY_KIT_PRICE}</IdentityKitCta>
          </div>
        </section>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.18em] text-gray-500 sm:text-xs sm:tracking-[0.22em]">
          {IDENTITY_KIT_VALUE_POINTS.map((value, i) => (
            <React.Fragment key={value}>
              {i > 0 ? (
                <span className="mx-1.5 text-gray-300 sm:mx-2" aria-hidden>
                  ·
                </span>
              ) : null}
              <span>{value}</span>
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="relative mt-16 w-screen left-1/2 -translate-x-1/2 md:mt-20">
        <div className="bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <section aria-labelledby="identity-kit-how-heading">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">How it works</span>
                <h2 id="identity-kit-how-heading" className="mt-2 font-serif text-3xl font-normal text-gray-900 md:text-4xl">
                  A simple path to a clearer brand.
                </h2>
              </div>

              <div className="mt-10 space-y-10 md:hidden">
                {IDENTITY_KIT_PROCESS_STEPS.map((step) => (
                  <div key={step.step}>
                    <p className="text-4xl font-bold leading-none text-gray-200">{step.step}</p>
                    <h3 className="mt-3 text-base font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 hidden items-start justify-between gap-8 md:flex lg:gap-10">
                {IDENTITY_KIT_PROCESS_STEPS.map((step, index) => (
                  <React.Fragment key={step.step}>
                    <div className="min-w-0 flex-1">
                      <p className="text-5xl font-bold leading-none text-gray-200">{step.step}</p>
                      <h3 className="mt-6 text-base font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-3 text-sm font-light leading-relaxed text-gray-600">{step.description}</p>
                    </div>
                    {index < IDENTITY_KIT_PROCESS_STEPS.length - 1 ? (
                      <div className="flex w-10 shrink-0 items-center justify-center self-stretch pt-10 text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                          aria-hidden
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="mt-16 grid gap-12 border-t border-gray-100 pt-16 md:mt-20 md:gap-16 md:pt-20 lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0 overflow-visible">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">What&apos;s inside</h2>

            <div className="group/papers relative mx-auto mt-6 h-[11rem] w-full max-w-[26rem] motion-safe:transition motion-safe:duration-300 motion-safe:ease-out sm:mt-8 sm:h-[12rem] sm:max-w-[33rem] motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0">
              <ul
                className="relative isolate m-0 h-full list-none overflow-visible p-0"
                aria-label="Foundation documents in the Identity Kit"
              >
                {IDENTITY_KIT_FOUNDATION_DELIVERABLES.map((name, i) => {
                  const spread = i - 1.5;
                  const pivotRem = spread * KIT_PAPER_FAN_PIVOT_REM;
                  const rotate = spread * KIT_PAPER_FAN_ROTATE_DEG;
                  const z = (i + 1) * 10;
                  const depth = i + 1;
                  return (
                    <li
                      key={name}
                      className="absolute bottom-0 left-1/2 w-[7rem] sm:w-[7.75rem]"
                      style={{
                        zIndex: z,
                        transform: `translateX(calc(-50% + ${pivotRem}rem)) rotate(${rotate}deg)`,
                        transformOrigin: '50% 100%',
                      }}
                    >
                      <div
                        className="relative flex aspect-[8.5/11] w-full flex-col justify-end overflow-hidden rounded-lg border border-gray-200 bg-white p-3 pl-4 ring-1 ring-gray-900/[0.05] transition-[border-color,box-shadow,ring-color] duration-300 sm:rounded-xl sm:p-3.5 sm:pl-5 group-hover/papers:border-gray-300 group-hover/papers:ring-gray-900/[0.08]"
                        style={{
                          boxShadow: `0 2px 0 rgba(15,23,42,0.05), 0 ${4 + depth * 3}px ${16 + depth * 5}px -${6 + depth}px rgba(15,23,42,${0.12 + depth * 0.028})`,
                        }}
                      >
                        <span className="pointer-events-none absolute inset-y-2 left-3 w-px bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 sm:inset-y-2.5 sm:left-3.5" aria-hidden />
                        <span className="pointer-events-none absolute left-1 top-[20%] h-2 w-2 rounded-full border border-gray-300 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:top-[19%]" aria-hidden />
                        <span className="pointer-events-none absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-gray-300 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" aria-hidden />
                        <span className="pointer-events-none absolute left-1 top-[80%] h-2 w-2 -translate-y-full rounded-full border border-gray-300 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:top-[81%]" aria-hidden />
                        <p className="font-serif text-sm font-medium leading-snug tracking-tight text-gray-900 sm:text-base">
                          {name}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <h3 className="mt-10 font-serif text-3xl font-normal text-gray-900 md:mt-12 md:text-4xl">
              Your brand foundation, ready to use.
            </h3>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
              Four practical documents for voice, look, and rollout — plus personalized messaging you can paste into
              posts, bios, and your site.
            </p>

            <div className="mt-8">
              <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-gray-400">Personalized messaging</h4>
              <ul className="mt-4 space-y-3">
                {IDENTITY_KIT_MESSAGING_DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                      <ProFeatureSparkIcon />
                    </span>
                    <span className="text-sm font-light leading-relaxed text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:border-l lg:border-gray-100 lg:pl-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">What this helps you do</h2>
            <h3 className="mt-2 font-serif text-3xl font-normal text-gray-900 md:text-4xl">Show up with more confidence.</h3>
            <ul className="mt-6 space-y-4">
              {IDENTITY_KIT_OUTCOMES.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                    <CheckIcon size="md" />
                  </span>
                  <span className="text-sm font-light leading-relaxed text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl border-t border-gray-100 pt-16 text-center md:mt-20 md:pt-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Next step</span>
          <h2 className="mt-2 font-serif text-3xl font-normal text-gray-900 md:text-4xl">
            One kit. Everything you need to sound and look like your business.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
            Go through the guided intake and leave with a clearer voice, look, and messaging you can use the same week.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <IdentityKitCta>Start your Identity Kit — {IDENTITY_KIT_PRICE}</IdentityKitCta>
            <p className="text-xs font-light text-gray-400">
              Already have your brand sorted?{' '}
              <Link to="/local-kits" className="text-gray-600 underline-offset-2 hover:text-gray-900 hover:underline">
                See local kits
              </Link>
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-black bg-black px-6 py-10 text-white sm:px-10 sm:py-12 md:mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-normal md:text-4xl">Ready to stop building your brand piecemeal?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-gray-200 sm:text-base">
              Answer a short guided quiz and receive your personalized brand documents by email.
            </p>
            <div className="mt-8 flex justify-center">
              <IdentityKitCta variant="inverse">Start your Identity Kit — {IDENTITY_KIT_PRICE}</IdentityKitCta>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IdentityKitPage;
