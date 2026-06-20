import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import { consumeQueuedStudioReturnScroll } from '../utils/studioReturnPath';

/**
 * Reset scroll on route changes. On the marketing home (`/`), if the URL has a hash (e.g. `/#products`),
 * scroll to that section instead of the top so nav and shared links land in the right place.
 * When returning from `/studio`, restore the saved scroll position when queued.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const restoreY = consumeQueuedStudioReturnScroll();
    if (restoreY !== null) {
      requestAnimationFrame(() => {
        window.scrollTo(0, restoreY);
      });
      return;
    }

    if (pathname === '/' && hash && hash.length > 1) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        scrollToSection(id);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
