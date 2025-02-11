import React from 'react';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { Shirt, Camera, Glasses as Sunglasses, Umbrella, Wallet, Bath, Cat as Hat, Rewind as SwimFin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Destinations = () => {
  const { t } = useTranslation(['sections', 'essentials', 'destinations']);

  const essentialItems = [
    { icon: Bath, label: t('items.towel', { ns: 'essentials' }) },
    { icon: Hat, label: t('items.cap', { ns: 'essentials' }) },
    { icon: SwimFin, label: t('items.swimsuit', { ns: 'essentials' }) },
    { icon: Umbrella, label: t('items.suncream', { ns: 'essentials' }) },
    { icon: Sunglasses, label: t('items.sunglasses', { ns: 'essentials' }) },
    { icon: Shirt, label: t('items.clothes', { ns: 'essentials' }) },
    { icon: Camera, label: t('items.camera', { ns: 'essentials' }) },
    { icon: Wallet, label: t('items.money', { ns: 'essentials' }) }
  ];

  const getDestinationTranslation = (destination: any) => {
    const key = destination.name.toLowerCase().replace(/ /g, '_');
    return {
      ...destination,
      name: t(`destinations.${key}.name`, { ns: 'destinations', defaultValue: destination.name }),
      description: t(`destinations.${key}.description`, { ns: 'destinations', defaultValue: destination.description })
    };
  };

  return (
    <section id="destinations" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {t('destinations.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-sm lg:text-base">
            {t('description', { ns: 'destinations' })}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-4 lg:gap-6 mb-8">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...getDestinationTranslation(destination)} />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {t('title', { ns: 'essentials' })}
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-3 lg:gap-4">
              {essentialItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="flex flex-col items-center p-3 sm:p-4 md:p-3 lg:p-4 bg-white rounded-xl shadow-md transform transition-all duration-300 
                             hover:scale-105 hover:shadow-lg hover:bg-blue-50 group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-blue-100 rounded-full mb-2 sm:mb-3 
                                  group-hover:bg-blue-200 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-xs lg:text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;