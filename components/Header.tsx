
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
          }} 
          className="flex items-center group"
        >
          <span className="text-xl font-bold tracking-tight text-gray-900 uppercase transition-colors group-hover:text-gray-500">Brand Alchemy</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-black transition-colors">Solutions</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-black transition-colors">Products</a>
          <a href="mailto:info@brandalchemyllc.com" className="hover:text-black transition-colors">Contact</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-900 p-2 focus:outline-none transition-transform active:scale-90"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col p-8 space-y-8 text-center text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-black transition-colors">Solutions</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-black transition-colors">Products</a>
          <a href="mailto:info@brandalchemyllc.com" onClick={closeMenu} className="hover:text-black transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
