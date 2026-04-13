import React from 'react';
import { Link } from 'react-router-dom';

export const ARTICLE_INLINE_CTA_SLOT = '<!-- ARTICLE_CTA_SLOT -->';

type ArticleProductCalloutProps = {
  /** Short line on the dark “tab” strip (matches Identity Kit Pro card pattern). */
  tabLabel: string;
  children: React.ReactNode;
  primaryHref: string;
  primaryLabel: string;
};

/**
 * Article inline product suggestion — stacked tab + card, aligned with Identity Kit `/identity-kit` Pro tier chrome.
 */
const ArticleProductCallout: React.FC<ArticleProductCalloutProps> = ({ tabLabel, children, primaryHref, primaryLabel }) => {
  return (
    <div className="relative my-10 pt-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex min-h-9 items-center justify-center rounded-t-2xl bg-black px-3 py-2 sm:min-h-9 sm:py-0"
        aria-hidden
      >
        <span className="max-w-full text-center text-[8px] font-bold uppercase leading-snug tracking-[0.12em] text-white sm:text-[9px] sm:tracking-[0.14em]">
          {tabLabel}
        </span>
      </div>

      <aside
        className="relative z-10 rounded-2xl border border-black bg-white p-5 text-left shadow-[0_16px_40px_-18px_rgba(0,0,0,0.18)] sm:p-6"
        aria-label="Suggested next step"
      >
        <div className="text-base font-light leading-relaxed text-gray-700">{children}</div>
        <div className="mt-5 flex justify-end">
          <Link
            to={primaryHref}
            className="inline-block w-fit border-b border-black pb-1 text-xs font-bold uppercase tracking-widest text-black no-underline transition-colors hover:border-gray-700 hover:text-gray-700"
          >
            {primaryLabel}
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default ArticleProductCallout;
