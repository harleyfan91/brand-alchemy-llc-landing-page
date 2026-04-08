import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Reset window scroll on client-side navigation (BrowserRouter does not do this by default). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
