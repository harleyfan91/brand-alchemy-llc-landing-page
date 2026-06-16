import React from 'react';
import ArticleProductCallout from '../components/ArticleProductCallout';
import { GUIDES_AND_KITS_PATH } from '../content/guidesAndKitsRoutes';

/**
 * Inline Pattern A product copy for shipped articles (keeps CTA out of markdown for styled callout).
 * Key by article slug when `ARTICLE_INLINE_CTA_SLOT` is present in the markdown body.
 */
export function renderArticleInlineCta(slug: string | undefined): React.ReactNode | null {
  if (slug === 'branding-vs-marketing-small-business') {
    return (
      <ArticleProductCallout
        tabLabel="Brand clarity, made simple"
        primaryHref="/identity-kit"
        primaryLabel="View Identity Kit"
      >
        <p>
          The{' '}
          <span className="font-serif text-lg font-normal leading-snug text-gray-900 sm:text-xl">Identity Kit</span>{' '}
          gives you a full system including voice, colors, and a repeatable way to describe what you sell so you are not
          starting from scratch every time you post.
        </p>
      </ArticleProductCallout>
    );
  }

  if (slug === 'weekly-social-posts-small-business') {
    return (
      <ArticleProductCallout
        tabLabel="When the caption stalls you"
        primaryHref={GUIDES_AND_KITS_PATH}
        primaryLabel="View guides & kits"
      >
        <p>
          The{' '}
          <span className="font-serif text-lg font-normal leading-snug text-gray-900 sm:text-xl">Social Content Pack</span>{' '}
          bundles short lines, starters, and fill-in-the-blank ideas for feed and stories so your weekly rhythm does not
          depend on a blank text box.
        </p>
      </ArticleProductCallout>
    );
  }

  return null;
}
