import React from 'react';
import AlchemyMark from './AlchemyMark';
import { scrollToSection } from '../utils/scrollToSection';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      scrollToSection(targetId);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-3">
            <span className="text-sm font-bold tracking-tight text-gray-900 uppercase">Brand Alchemy</span>
          </div>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest max-w-xs text-center md:text-left">
            Turning everyday businesses into standout brands.
          </p>
        </div>

        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-black transition-colors">Solutions</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-black transition-colors">Products</a>
          <a href="mailto:info@brandalchemyllc.com" className="hover:text-black transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-2.5 text-gray-300 text-xs font-medium uppercase tracking-widest">
          <AlchemyMark size="xs" className="text-gray-300 normal-case" />
          © {new Date().getFullYear()} Brand Alchemy LLC.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
