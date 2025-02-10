import React from 'react';
import { useTranslation } from 'react-i18next';
import SocialShare from './SocialShare';

const MapSection = () => {
  const { t } = useTranslation('sections');

  return (
    <section id="location" className="pt-2 pb-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-center">
          {t('location.title')}
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.0817574274256!2d14.526006600000002!3d45.124679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47636fda8bc9d2bd%3A0x9b0563f32fc98d56!2sZen%20Nautica%20Malinska!5e0!3m2!1sen!2shr!4v1738281856674!5m2!1sen!2shr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zen Nautica Location"
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="mt-4 text-center space-y-4">
            <p className="text-lg text-gray-600">
              {t('location.address')}
              <span className="font-semibold">{t('location.fullAddress')}</span>
            </p>
            <div className="flex justify-center">
              <SocialShare 
                url="https://zennautica.com"
                title="Zen Nautica - Premium Boat Rental in Malinska, Croatia"
                description="Experience the beauty of the Adriatic Sea with our premium fleet of boats. Book your perfect boat adventure today in Malinska, Krk Island."
                className="justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;