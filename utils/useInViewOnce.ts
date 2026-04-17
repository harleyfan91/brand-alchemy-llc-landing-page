import { useEffect, useRef, useState } from 'react';

type UseInViewOnceOptions = {
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInViewOnce<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = '0px',
  disabled = false,
}: UseInViewOnceOptions = {}) {
  const ref = useRef<T | null>(null);
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion);
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);

    const onChange = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) {
        setHasEntered(true);
      }
    };

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (disabled || reduceMotion || hasEntered) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        // When threshold > 0, require that much of the target to be visible. Avoid very high
        // thresholds on tall sections: max ratio is (visible portion / element height) and can
        // stay low if the section is much taller than the viewport.
        if (threshold > 0 && entry.intersectionRatio < threshold) {
          return;
        }
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled, hasEntered, reduceMotion, rootMargin, threshold]);

  return { ref, hasEntered, reduceMotion };
}
