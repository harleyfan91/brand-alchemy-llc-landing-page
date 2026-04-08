import React from 'react';
import { BrowserRouter, Route, Routes, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import IdentityKitPage from './pages/IdentityKitPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/identity-kit" element={<IdentityKitPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
