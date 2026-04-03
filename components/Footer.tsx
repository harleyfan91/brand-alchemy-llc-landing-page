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
    <footer className="border-t border-gray-100 bg-white py-6 md:py-8 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8 lg:px-8">
        <p className="max-w-xs text-center text-[11px] font-medium uppercase tracking-widest text-gray-400 md:max-w-none md:text-left md:text-xs">
          Turning everyday businesses into standout brands.
        </p>

        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:gap-x-8"
          aria-label="Footer"
        >
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="transition-colors hover:text-black">
            Solutions
          </a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="transition-colors hover:text-black">
            Products
          </a>
          <a href="mailto:info@brandalchemyllc.com" className="transition-colors hover:text-black">
            Contact
          </a>
        </nav>

        <div className="flex items-center justify-center gap-2.5 text-xs font-medium uppercase tracking-widest text-gray-300 md:justify-end">
          <AlchemyMark size="xs" className="text-gray-300 normal-case" />
          © {new Date().getFullYear()} Brand Alchemy LLC.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
