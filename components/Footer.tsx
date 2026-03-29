import React from 'react';
import AlchemyMark from './AlchemyMark';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-3">
            {/* Brand name: kept as-is — intentional weight */}
            <span className="text-sm font-bold tracking-tight text-gray-900 uppercase">Brand Alchemy</span>
          </div>
          {/* Tagline: text-xs — short decorative line, uppercase, acceptable at this size */}
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest max-w-xs text-center md:text-left">
            Refining business excellence through productized solutions.
          </p>
        </div>

        {/* Nav links: text-[10px] — intentional minimal nav aesthetic, consistent with header */}
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-black transition-colors">Solutions</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-black transition-colors">Products</a>
          <a href="mailto:info@brandalchemyllc.com" className="hover:text-black transition-colors">Contact</a>
        </div>

        {/* Copyright + maker's mark */}
        <div className="flex items-center gap-2.5 text-gray-300 text-xs font-medium uppercase tracking-widest">
          <AlchemyMark size="xs" className="text-gray-300" />
          <span className="w-px h-3 bg-gray-200" aria-hidden="true" />
          © {new Date().getFullYear()} Brand Alchemy LLC.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
