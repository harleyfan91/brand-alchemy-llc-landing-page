import React from 'react';

/** Phrases to emphasize in local launch kit summaries and bullets. */
const EMPHASIS_PHRASES = ['30 review response scripts', 'rank higher in local search'] as const;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function renderKitCopy(text: string): React.ReactNode {
  const pattern = new RegExp(`(${EMPHASIS_PHRASES.map(escapeRegex).join('|')})`, 'gi');
  const parts = text.split(pattern);

  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    const emphasized = EMPHASIS_PHRASES.some((phrase) => phrase.toLowerCase() === part.toLowerCase());
    if (!emphasized) return part;
    return (
      <strong key={index} className="font-semibold text-gray-800">
        {part}
      </strong>
    );
  });
}
