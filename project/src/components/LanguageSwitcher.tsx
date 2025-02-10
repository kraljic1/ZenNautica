import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'hu', flag: '🇭🇺', name: 'Magyar' },
  { code: 'hr', flag: '🇭🇷', name: 'Hrvatski' },
  { code: 'sl', flag: '🇸🇮', name: 'Slovenščina' },
  { code: 'sk', flag: '🇸🇰', name: 'Slovenčina' },
  { code: 'cs', flag: '🇨🇿', name: 'Čeština' },
  { code: 'pl', flag: '🇵🇱', name: 'Polski' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-xl hover:opacity-80 transition-all"
        aria-label={`Current language: ${currentLanguage.name}`}
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 p-2 bg-white rounded-lg z-50 grid grid-cols-3 gap-1 w-[120px] shadow-lg border border-gray-100">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`text-xl hover:opacity-80 transition-opacity p-1 rounded ${
                  lang.code === i18n.language ? 'bg-blue-50' : ''
                }`}
                title={lang.name}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;