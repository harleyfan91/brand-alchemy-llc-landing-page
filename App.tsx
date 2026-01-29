
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Header />
      <main className="flex-grow">
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
