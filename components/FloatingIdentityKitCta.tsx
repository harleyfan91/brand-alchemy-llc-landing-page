import React, { useEffect, useRef, useState } from 'react';

type Props = {
  href: string;
  openInNewTab: boolean;
  label?: string;
};

/**
 * Scroll-linked width + type size — same behavior as `identity-kit` TierSelector floating CTA.
 */
const FloatingIdentityKitCta: React.FC<Props> = ({
  href,
  openInNewTab,
  label = 'Start my Identity Kit',
}) => {
  const [ctaProgress, setCtaProgress] = useState(0);
  const [ctaWidthRatio, setCtaWidthRatio] = useState(0.62);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, y / maxScroll));
      setCtaProgress(progress);
      setCtaWidthRatio(0.62 + progress * 0.38);
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 sm:bottom-6 sm:w-[calc(100%-3rem)]">
      <div className="flex w-full justify-center">
        <a
          href={href}
          {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="pointer-events-auto block origin-center rounded-full bg-black px-5 py-3 text-center font-sans font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-gray-800"
          style={{
            width: `${ctaWidthRatio * 100}%`,
            fontSize: `${12 + ctaProgress * 2}px`,
          }}
        >
          {label}
        </a>
      </div>
    </div>
  );
};

export default FloatingIdentityKitCta;
