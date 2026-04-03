import React from 'react';
import AlchemyMark from './AlchemyMark';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-6 md:py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
        <p className="max-w-md text-center text-[11px] font-medium uppercase tracking-widest text-gray-400 md:max-w-none md:text-left md:text-xs">
          Turning everyday businesses into standout brands.
        </p>

        <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-gray-300">
          <AlchemyMark size="xs" className="text-gray-300 normal-case" />
          © {new Date().getFullYear()} Brand Alchemy LLC.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
