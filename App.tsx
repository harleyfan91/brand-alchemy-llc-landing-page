import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import IdentityKitPage from './pages/IdentityKitPage';
import DigitalProductTemplatePreviewPage from './pages/DigitalProductTemplatePreviewPage';
import GuidesAndKitsPage from './pages/GuidesAndKitsPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
// Dev-only: gray ramp reference panel. Uncomment import + line below; keep `import.meta.env.DEV` so it never ships in production.
// import NeutralRampPreview from './components/NeutralRampPreview';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/identity-kit" element={<IdentityKitPage />} />
          <Route path="/local-business" element={<GuidesAndKitsPage />} />
          <Route path="/product-page-primitives" element={<DigitalProductTemplatePreviewPage />} />
        </Routes>
        <Footer />
        {/* {import.meta.env.DEV ? <NeutralRampPreview /> : null} */}
      </div>
    </BrowserRouter>
  );
};

export default App;
