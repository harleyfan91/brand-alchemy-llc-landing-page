import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import IdentityKitPage from './pages/IdentityKitPage';
import IdentityKitSelectorPage from './pages/IdentityKitSelectorPage';
import DigitalProductTemplatePreviewPage from './pages/DigitalProductTemplatePreviewPage';
import GuidesAndKitsPage from './pages/GuidesAndKitsPage';
import ArticlePage from './pages/ArticlePage';
import { GUIDES_AND_KITS_PATH } from './content/guidesAndKitsRoutes';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './components/page-route-fade.css';
// Dev-only: gray ramp reference panel. Uncomment import + line below; keep `import.meta.env.DEV` so it never ships in production.
// import NeutralRampPreview from './components/NeutralRampPreview';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col selection:bg-black selection:text-white">
        <Header />
        <div key={location.pathname} className="ba-page-route-fade w-full min-w-0 min-h-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/identity-kit" element={<IdentityKitPage />} />
            <Route path="/identity-kit/select" element={<IdentityKitSelectorPage />} />
            <Route path="/local-business" element={<Navigate to={GUIDES_AND_KITS_PATH} replace />} />
            <Route path={GUIDES_AND_KITS_PATH} element={<GuidesAndKitsPage />} />
            {/* Future: <Route path={`${GUIDES_AND_KITS_PATH}/:industry`} element={<GuidesAndKitsIndustryPage />} /> */}
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/product-page-primitives" element={<DigitalProductTemplatePreviewPage />} />
          </Routes>
        </div>
        <Footer />
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
