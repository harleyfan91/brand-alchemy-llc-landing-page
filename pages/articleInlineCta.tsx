import React from 'react';
import ArticleProductCallout from '../components/ArticleProductCallout';

/**
 * Inline Pattern A product copy for shipped articles (keeps CTA out of markdown for styled callout).
 * Key by article slug when `ARTICLE_INLINE_CTA_SLOT` is present in the markdown body.
 */
export function renderArticleInlineCta(slug: string | undefined): React.ReactNode | null {
  if (slug !== 'branding-vs-marketing-small-business') {
    return null;
  }

  return (
    <ArticleProductCallout
      tabLabel="Brand clarity, made simple"
      primaryHref="/identity-kit"
      primaryLabel="View Identity Kit"
    >
      <p>
        The{' '}
        <span className="font-serif text-lg font-normal leading-snug text-gray-900 sm:text-xl">Identity Kit</span> gives
        you a full system including voice, colors, and a repeatable way to describe what you sell so you are not starting
        from scratch every time you post.
      </p>
    </ArticleProductCallout>
  );
}
