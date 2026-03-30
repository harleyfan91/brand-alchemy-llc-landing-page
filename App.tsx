import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AlchemyBackground from './components/AlchemyBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white relative">
      {/* Scroll-driven alchemical symbol layer — dropped z-index to 0 to sit behind content */}
      <AlchemyBackground />
      
      <Header />
      
      {/* Added relative z-10 so all content sits above the fixed background symbols */}
      <main className="flex-grow relative z-10">
        <Hero />
        <Services />
        <Products />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
