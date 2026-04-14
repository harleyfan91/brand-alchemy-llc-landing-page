import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from './CheckIcon';
import OfferMatrixPrimitive from './primitives/OfferMatrixPrimitive.tsx';
import ProductPhotoGridPrimitive from './primitives/ProductPhotoGridPrimitive.tsx';
import SingleOfferTile from './primitives/SingleOfferTile.tsx';
import { DIGITAL_PRODUCT_PRIMITIVES } from './primitives/digitalProductPrimitives';
import { checkoutOpensInNewTab, normalizeCheckoutHref } from '../utils/checkoutHref';

export interface DigitalProductPageCta {
  href: string;
  label: string;
}

export interface DigitalProductPackage {
  name: string;
  price: string;
  summary: string;
  bullets: string[];
  emphasis?: boolean;
  ctaLabel?: string;
}

export interface DigitalProductOfferOption {
  name: string;
  price: string;
  bullets: string[];
  ctaLabel?: string;
}

export interface DigitalProductMatrixColumn {
  name: string;
  teaser?: string;
  summary: string;
  toneKey?: 'google' | 'yelp' | 'both';
  options: DigitalProductOfferOption[];
}

export interface DigitalProductFaq {
  question: string;
  answer: string;
}

export interface DigitalProductPageContent {
  slug: string;
  breadcrumbLabel: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  quickFacts: string[];
  packageSectionTitle: string;
  matrixColumns?: DigitalProductMatrixColumn[];
  packages: DigitalProductPackage[];
  singleOfferPreview?: DigitalProductPackage;
  photoGridPreviewItems?: {
    title: string;
    subtitle: string;
    price: string;
    description: string;
    imageUrl: string;
    ctaLabel?: string;
  }[];
  showPrimitiveGallery?: boolean;
  includedTitle: string;
  includedBullets: string[];
  outcomesTitle: string;
  outcomesBullets: string[];
  forYouTitle: string;
  forYouBullets: string[];
  notForYouTitle: string;
  notForYouBullets: string[];
  faqs: DigitalProductFaq[];
  primaryCta: DigitalProductPageCta;
  secondaryCta?: DigitalProductPageCta;
  legalNote?: string;
}

const DigitalProductPage: React.FC<{ product: DigitalProductPageContent }> = ({ product }) => {
  const primaryCheckoutHref = normalizeCheckoutHref(product.primaryCta.href);
  const secondaryCheckoutHref = product.secondaryCta
    ? normalizeCheckoutHref(product.secondaryCta.href)
    : null;
  const openCtaInNewTab = primaryCheckoutHref ? checkoutOpensInNewTab(primaryCheckoutHref) : false;
  const openSecondaryInNewTab = secondaryCheckoutHref ? checkoutOpensInNewTab(secondaryCheckoutHref) : false;

  const matrixColumns: DigitalProductMatrixColumn[] =
    product.matrixColumns ||
    product.packages.map((pkg) => ({
      name: pkg.name,
      teaser: pkg.price,
      summary: pkg.summary,
      options: [
        {
          name: pkg.name,
          price: pkg.price,
          bullets: pkg.bullets,
          ctaLabel: pkg.ctaLabel,
        },
      ],
    }));

  const singleOfferPreview = product.singleOfferPreview || product.packages[0];

  return (
    <main className="flex-grow scroll-mt-20 bg-white pb-16 pt-20 md:pb-24 md:pt-28">
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
              {product.breadcrumbLabel}
            </li>
          </ol>
        </nav>

        <section className="py-2 sm:py-4" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.HERO}>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">{product.categoryLabel}</span>
          <div className="mt-2 max-w-3xl">
            <h1 className="font-serif text-3xl font-normal leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
              {product.subtitle}
            </p>
          </div>

          <div className="mt-5 hidden flex-wrap gap-x-4 gap-y-1 sm:flex">
            {product.quickFacts.map((fact) => (
              <span key={fact} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                {fact}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:hidden">
            {product.quickFacts.slice(0, 2).map((fact) => (
              <span
                key={fact}
                className="text-[10px] font-bold uppercase tracking-wide text-gray-500"
              >
                {fact}
              </span>
            ))}
            {product.quickFacts.length > 2 ? (
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                +{product.quickFacts.length - 2} more
              </span>
            ) : null}
          </div>

        </section>

        <section className="mt-10" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.OFFER_MATRIX}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-normal text-gray-900 sm:text-3xl">{product.packageSectionTitle}</h2>
          </div>
          {product.packages.length === 1 ? (
            <div data-primitive={DIGITAL_PRODUCT_PRIMITIVES.SINGLE_OFFER_TILE}>
              <SingleOfferTile
                offer={product.packages[0]}
                primaryHref={product.primaryCta.href}
                primaryLabel={product.primaryCta.label}
                openInNewTab={openCtaInNewTab}
              />
            </div>
          ) : (
            <OfferMatrixPrimitive
              columns={matrixColumns}
              primaryHref={product.primaryCta.href}
              primaryBuyLabel={product.primaryCta.label}
            />
          )}
        </section>

        {product.showPrimitiveGallery && singleOfferPreview ? (
          <section className="mt-10" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.SINGLE_OFFER_TILE}>
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-normal text-gray-900 sm:text-3xl">Single offer tile primitive</h2>
              <p className="mt-1 text-sm font-light text-gray-500">Standalone SKU block preview.</p>
            </div>
            <SingleOfferTile
              offer={singleOfferPreview}
              primaryHref={product.primaryCta.href}
              primaryLabel={product.primaryCta.label}
              openInNewTab={openCtaInNewTab}
            />
          </section>
        ) : null}

        {product.showPrimitiveGallery && product.photoGridPreviewItems?.length ? (
          <section className="mt-10">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-normal text-gray-900 sm:text-3xl">Photo product grid primitive</h2>
              <p className="mt-1 text-sm font-light text-gray-500">Card grid for products that need image-led browsing.</p>
            </div>
            <ProductPhotoGridPrimitive items={product.photoGridPreviewItems} />
          </section>
        ) : null}

        <section className="mt-12 hidden gap-10 md:grid md:grid-cols-2" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.DETAILS_LISTS}>
          <article>
            <h3 className="font-serif text-xl font-normal text-gray-900">{product.includedTitle}</h3>
            <ul className="mt-3 space-y-2">
              {product.includedBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3 className="font-serif text-xl font-normal text-gray-900">{product.outcomesTitle}</h3>
            <ul className="mt-3 space-y-2">
              {product.outcomesBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 hidden gap-10 md:grid md:grid-cols-2" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.DETAILS_LISTS}>
          <article>
            <h3 className="font-serif text-xl font-normal text-gray-900">{product.forYouTitle}</h3>
            <ul className="mt-3 space-y-2">
              {product.forYouBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3 className="font-serif text-xl font-normal text-gray-900">{product.notForYouTitle}</h3>
            <ul className="mt-3 space-y-2">
              {product.notForYouBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 space-y-1 border-t border-gray-100 pt-4 md:hidden" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.DETAILS_LISTS}>
          <details className="py-2" open>
            <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 marker:hidden">
              {product.includedTitle}
            </summary>
            <ul className="mt-3 space-y-2">
              {product.includedBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="border-t border-gray-100 py-2">
            <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 marker:hidden">
              {product.outcomesTitle}
            </summary>
            <ul className="mt-3 space-y-2">
              {product.outcomesBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="border-t border-gray-100 py-2">
            <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 marker:hidden">
              {product.forYouTitle}
            </summary>
            <ul className="mt-3 space-y-2">
              {product.forYouBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="border-t border-gray-100 py-2">
            <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 marker:hidden">
              {product.notForYouTitle}
            </summary>
            <ul className="mt-3 space-y-2">
              {product.notForYouBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
                  <span aria-hidden className="mt-0.5 text-gray-500">
                    <CheckIcon size="md" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section className="mt-12 border-t border-gray-100 pt-6" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.FAQ}>
          <h2 className="font-serif text-2xl font-normal text-gray-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-gray-100">
            {product.faqs.map((faq) => (
              <details key={faq.question} className="group py-3">
                <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-gray-800 marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm font-light leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-black bg-black p-6 text-white sm:p-8" data-primitive={DIGITAL_PRODUCT_PRIMITIVES.FINAL_CTA}>
          <h2 className="font-serif text-2xl font-normal sm:text-3xl">Ready to choose your product?</h2>
          <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-gray-200 sm:text-base">
            Pick the package that matches your current bottleneck and start with a clear next step.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            {primaryCheckoutHref ? (
              <a
                href={primaryCheckoutHref}
                {...(openCtaInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors hover:bg-gray-100"
              >
                {product.primaryCta.label}
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-gray-600 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Coming soon
              </button>
            )}
            {product.secondaryCta ? (
              secondaryCheckoutHref ? (
                <a
                  href={secondaryCheckoutHref}
                  {...(openSecondaryInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center justify-center rounded-full border border-gray-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
                >
                  {product.secondaryCta.label}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-gray-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500"
                >
                  Coming soon
                </button>
              )
            ) : null}
          </div>
          {product.legalNote ? (
            <p className="mt-4 text-[11px] font-light leading-relaxed text-gray-300">{product.legalNote}</p>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default DigitalProductPage;
