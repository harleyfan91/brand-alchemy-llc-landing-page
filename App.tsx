import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Guides from './components/Guides';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AlchemyBackground from './components/AlchemyBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      {/* Scroll-driven alchemical symbol layer — sits below header (z-50) and modals (z-100) */}
      <AlchemyBackground />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Products />
        <Guides />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
