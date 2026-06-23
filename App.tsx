import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import IdentityKitPage from './pages/IdentityKitPage';
import IdentityKitSelectorPage from './pages/IdentityKitSelectorPage';
import DigitalProductTemplatePreviewPage from './pages/DigitalProductTemplatePreviewPage';
import LocalKitsPage from './pages/GuidesAndKitsPage';
import ArticlePage from './pages/ArticlePage';
import StudioPage from './pages/StudioPage';
import StudioIntakePage from './pages/StudioIntakePage';
import { GUIDES_AND_KITS_PATH } from './content/guidesAndKitsRoutes';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './components/page-route-fade.css';
// Dev-only: gray ramp reference panel. Uncomment import + line below; keep `import.meta.env.DEV` so it never ships in production.
// import NeutralRampPreview from './components/NeutralRampPreview';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isStudio = location.pathname.startsWith('/studio');

  useEffect(() => {
    document.documentElement.classList.toggle('ba-studio-route', isStudio);
    return () => {
      document.documentElement.classList.remove('ba-studio-route');
    };
  }, [isStudio]);

  /*
   * The main Header is always rendered (position: fixed, no layout cost) and faded
   * in/out via an opacity transition. This prevents the jarring snap-in when returning
   * from /studio — Header rendered outside ba-page-route-fade would otherwise appear
   * instantly while the page content is still fading.
   */
  const hubChromeFade: React.CSSProperties = {
    opacity: isStudio ? 0 : 1,
    pointerEvents: isStudio ? 'none' : undefined,
    transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1)',
  };

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col selection:bg-black selection:text-white">
        <div style={hubChromeFade} aria-hidden={isStudio || undefined}>
          <Header />
        </div>
        <div key={location.pathname} className="ba-page-route-fade w-full min-w-0 min-h-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/identity-kit" element={<IdentityKitPage />} />
            <Route path="/identity-kit/select" element={<IdentityKitSelectorPage />} />
            <Route path="/local-business" element={<Navigate to={GUIDES_AND_KITS_PATH} replace />} />
            <Route path="/guides-and-kits" element={<Navigate to={GUIDES_AND_KITS_PATH} replace />} />
            <Route path={GUIDES_AND_KITS_PATH} element={<LocalKitsPage />} />
            {/* Future: <Route path={`${GUIDES_AND_KITS_PATH}/:industry`} element={<LocalKitsIndustryPage />} /> */}
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/product-page-primitives" element={<DigitalProductTemplatePreviewPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/studio/intake" element={<StudioIntakePage />} />
          </Routes>
        </div>
        <div style={hubChromeFade} aria-hidden={isStudio || undefined}>
          <Footer />
        </div>
        {/* {import.meta.env.DEV ? <NeutralRampPreview /> : null} */}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
