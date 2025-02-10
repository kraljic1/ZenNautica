import React from 'react';
import { features } from '../data/features';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation(['sections', 'features']);

  return (
    <section id="features" className="pt-2 pb-4 sm:pt-4 sm:pb-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {t('features.title', { ns: 'sections' })}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('sectionDescription', { ns: 'features' })}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="p-4 sm:p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white group"
              >
                <div className="flex flex-col items-start">
                  <div className="inline-block p-3 bg-blue-500 rounded-full text-white mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {t(feature.title, { ns: 'features' })}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(feature.description, { ns: 'features' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;