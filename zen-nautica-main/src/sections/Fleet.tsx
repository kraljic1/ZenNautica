import React from 'react';
import BoatCard from '../components/BoatCard';
import { boats } from '../data/boats';
import { useTranslation } from 'react-i18next';

const Fleet = () => {
  const { t } = useTranslation('sections');

  return (
    <section id="fleet" className="pt-4 pb-4 sm:pt-6 sm:pb-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-center">
          {t('fleet.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {boats.map((boat, index) => (
            <BoatCard key={index} {...boat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;