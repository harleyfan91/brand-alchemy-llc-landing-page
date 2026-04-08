import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Products from './Products';
import Guides from './Guides';
import Contact from './Contact';
import AlchemyBackground from './AlchemyBackground';

/** Homepage: full marketing one-pager (sections + anchors). */
const HomePage: React.FC = () => {
  return (
    <>
      <AlchemyBackground />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Products />
        <Guides />
        <Contact />
      </main>
    </>
  );
};

export default HomePage;
