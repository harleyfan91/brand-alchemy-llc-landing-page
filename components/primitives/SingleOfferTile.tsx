import React from 'react';
import CheckIcon from '../CheckIcon';
import type { DigitalProductPackage } from '../DigitalProductPage';

interface SingleOfferTileProps {
  offer: DigitalProductPackage;
  primaryHref: string;
  primaryLabel: string;
  openInNewTab: boolean;
}

const SingleOfferTile: React.FC<SingleOfferTileProps> = ({ offer, primaryHref, primaryLabel, openInNewTab }) => (
  <article className="rounded-2xl border border-gray-200 p-5 sm:p-6">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-serif text-2xl font-normal text-gray-900">{offer.name}</h3>
      <span className="text-xl font-light tracking-tight text-gray-900">{offer.price}</span>
    </div>
    <p className="mt-2 text-sm font-light leading-relaxed text-gray-600">{offer.summary}</p>
    <ul className="mt-4 space-y-2">
      {offer.bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-700">
          <span aria-hidden className="mt-0.5 text-gray-500">
            <CheckIcon size="md" />
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
    <a
      href={primaryHref}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
    >
      {offer.ctaLabel || primaryLabel}
    </a>
  </article>
);

export default SingleOfferTile;
