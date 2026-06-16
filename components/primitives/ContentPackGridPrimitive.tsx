import React, { useId, useState } from 'react';
import type { ContentPackFamily, ContentPackIndustrySlug } from '../../content/contentPacks';
import { getContentPackIndustry } from '../../content/contentPacks';
import { checkoutOpensInNewTab, normalizeCheckoutHref } from '../../utils/checkoutHref';

export type ContentPackGridPrimitiveProps = {
  families: ContentPackFamily[];
  getCheckoutHref?: (familyId: string, industrySlug: ContentPackIndustrySlug) => string | null | undefined;
  primaryBuyLabel?: string;
  primaryUnavailableLabel?: string;
};

type ContentPackIndustrySelectorProps = {
  industries: ContentPackIndustrySlug[];
  selectedIndustry: ContentPackIndustrySlug;
  onSelect: (slug: ContentPackIndustrySlug) => void;
};

const SelectChevron = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ContentPackIndustrySelector: React.FC<ContentPackIndustrySelectorProps> = ({
  industries,
  selectedIndustry,
  onSelect,
}) => {
  const labelId = useId();

  return (
    <div className="mt-3">
      <span id={labelId} className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        Your industry
      </span>

      <div className="relative mt-1.5 sm:hidden">
        <select
          aria-labelledby={labelId}
          value={selectedIndustry}
          onChange={(event) => onSelect(event.target.value as ContentPackIndustrySlug)}
          className="min-h-[2.75rem] w-full cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 pl-3.5 pr-10 text-sm text-gray-900 focus:border-black focus:outline-none"
        >
          {industries.map((industrySlug) => {
            const industry = getContentPackIndustry(industrySlug);
            return (
              <option key={industrySlug} value={industrySlug}>
                {industry.label}
              </option>
            );
          })}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <SelectChevron />
        </span>
      </div>

      <div
        className="mt-1.5 hidden rounded-full border border-gray-200 bg-gray-50/90 p-1 sm:flex"
        role="radiogroup"
        aria-labelledby={labelId}
      >
        {industries.map((industrySlug) => {
          const industry = getContentPackIndustry(industrySlug);
          const isSelected = selectedIndustry === industrySlug;

          return (
            <button
              key={industrySlug}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(industrySlug)}
              className={`min-w-0 flex-1 rounded-full px-2 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-black text-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.45)]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {industry.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

type ContentPackCardProps = {
  family: ContentPackFamily;
  getCheckoutHref?: ContentPackGridPrimitiveProps['getCheckoutHref'];
  primaryBuyLabel: string;
  primaryUnavailableLabel: string;
};

const ctaBase =
  'mt-3 inline-flex w-full items-center justify-center rounded-full border py-2.5 text-[10px] font-bold uppercase tracking-widest sm:py-2';
const ctaLive = 'border-transparent bg-black text-white transition-colors hover:bg-gray-800';
const ctaDisabled = 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500';

const ContentPackCard: React.FC<ContentPackCardProps> = ({
  family,
  getCheckoutHref,
  primaryBuyLabel,
  primaryUnavailableLabel,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<ContentPackIndustrySlug>(family.industries[0]);
  const checkoutHref = normalizeCheckoutHref(getCheckoutHref?.(family.id, selectedIndustry));
  const isPackIllustration = family.imageUrl.endsWith('.svg');

  return (
    <article className="group flex h-full flex-row items-stretch overflow-hidden rounded-xl border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] sm:rounded-2xl sm:flex-col">
      <div className="relative w-[min(38%,9rem)] shrink-0 self-stretch min-h-[8.5rem] overflow-hidden bg-gray-100 sm:aspect-[4/3] sm:w-full sm:min-h-0">
        <img
          src={family.imageUrl}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.02] ${
            isPackIllustration ? 'grayscale-0 group-hover:grayscale' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
          }`}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col border-l border-gray-100 p-3 sm:border-l-0 sm:border-t sm:p-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{family.categoryEyebrow}</span>
        <div className="mt-1 flex items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 font-serif text-sm font-normal leading-snug text-gray-900 sm:text-base">
            {family.title}
          </h3>
          <span className="shrink-0 text-lg font-light tracking-tight text-gray-900">{family.price}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 flex-grow text-xs font-light leading-relaxed text-gray-500 sm:line-clamp-3">
          {family.summary}
        </p>

        <ContentPackIndustrySelector
          industries={family.industries}
          selectedIndustry={selectedIndustry}
          onSelect={setSelectedIndustry}
        />

        {checkoutHref ? (
          <a
            href={checkoutHref}
            {...(checkoutOpensInNewTab(checkoutHref) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`${ctaBase} ${ctaLive}`}
          >
            {primaryBuyLabel}
          </a>
        ) : (
          <button type="button" disabled className={`${ctaBase} ${ctaDisabled}`}>
            {primaryUnavailableLabel}
          </button>
        )}
      </div>
    </article>
  );
};

const ContentPackGridPrimitive: React.FC<ContentPackGridPrimitiveProps> = ({
  families,
  getCheckoutHref,
  primaryBuyLabel = 'Buy now',
  primaryUnavailableLabel = 'Coming soon',
}) => (
  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
    {families.map((family) => (
      <ContentPackCard
        key={family.id}
        family={family}
        getCheckoutHref={getCheckoutHref}
        primaryBuyLabel={primaryBuyLabel}
        primaryUnavailableLabel={primaryUnavailableLabel}
      />
    ))}
  </div>
);

export default ContentPackGridPrimitive;
