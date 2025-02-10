import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Zen Nautica</h3>
            <p className="text-gray-400 leading-relaxed">{t('description')}</p>
            <p className="text-gray-400 leading-relaxed">{t('experience')}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p>Petrlini 7, Malinska</p>
                  <p>{t('location')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <p>
                  <span className="block text-sm text-gray-500">
                    {t('phone')}
                  </span>
                  +(385) 91 228 2882
                </p>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <p>
                  <span className="block text-sm text-gray-500">
                    {t('email')}
                  </span>
                  contact@zen-nautica.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#fleet"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('fleet', { ns: 'nav' })}
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('destinations', { ns: 'nav' })}
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('features', { ns: 'nav' })}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Business Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ZenNauticaMalinska"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/zennauticamalinska/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-300 mb-2">
                {t('businessHours.title')}
              </h5>
              <p className="text-gray-400">{t('businessHours.weekdays')}</p>
              <p className="text-gray-400">{t('businessHours.availability')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <a
            href="https://codeandsail.com/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mt-2 inline-block"
          >
            {t('designedBy')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
