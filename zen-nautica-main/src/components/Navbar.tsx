import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('nav');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    
    const performScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 96; // Height of the navbar + some padding
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(performScroll, 100);
    } else {
      performScroll();
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+385912282882';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/385912282882', '_blank');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          {/* Logo Section */}
          <div className="flex-1 md:flex-none">
            <a 
              href="/"
              onClick={handleHomeClick}
              className="h-8 sm:h-10 md:h-12 inline-block transition-all duration-300"
            >
              <img 
                src="https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/67641b2f4693512e544f025b.png" 
                alt="Zen Nautica Logo"
                title="Zen Nautica - Premium Boat Rental"
                className="h-full w-auto"
                fetchpriority="high"
                decoding="async"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#fleet"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('fleet');
              }}
              className={`${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'} cursor-pointer transition-colors`}
            >
              {t('fleet')}
            </a>
            <a 
              href="#destinations"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('destinations');
              }}
              className={`${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'} cursor-pointer transition-colors`}
            >
              {t('destinations')}
            </a>
            <a 
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
              className={`${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'} cursor-pointer transition-colors`}
            >
              {t('features')}
            </a>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button 
                onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-4 sm:px-6 py-2 rounded-full hover:bg-[#128C7E] transition-colors flex items-center space-x-2"
              >
                <MessageCircle size={18} />
                <span className="hidden sm:inline">{t('whatsApp')}</span>
              </button>
              <button 
                onClick={handleCall}
                className={`${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                } px-4 sm:px-6 py-2 rounded-full transition-colors flex items-center space-x-2`}
              >
                <Phone size={18} />
                <span className="hidden sm:inline">{t('callNow')}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 p-2 transition-colors`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#fleet"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('fleet');
                }}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t('fleet')}
              </a>
              <a 
                href="#destinations"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('destinations');
                }}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t('destinations')}
              </a>
              <a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t('features')}
              </a>
              <button 
                onClick={handleWhatsApp}
                className="w-full mt-4 bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-[#128C7E] transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={18} />
                <span>{t('whatsApp')}</span>
              </button>
              <button 
                onClick={handleCall}
                className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={18} />
                <span>{t('callNow')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;