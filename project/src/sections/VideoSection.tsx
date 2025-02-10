import React, { lazy, Suspense } from 'react';
import { Ship, Dog, Anchor } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Lazy load the VideoEmbed component
const VideoEmbed = lazy(() => import('../components/VideoEmbed'));

const VideoSection = () => {
  const { t } = useTranslation('sections');

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-center">
          {t('experience.title')}
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <Suspense fallback={
            <div className="aspect-video bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading video player...</div>
            </div>
          }>
            <VideoEmbed videoId="vRjltRWxIP0" />
          </Suspense>
          
          {/* Skipper Service Box */}
          <div className="p-4 sm:p-6 bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <div className="flex flex-col items-start">
              <div className="inline-block p-3 bg-blue-500 rounded-full text-white mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Ship size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {t('experience.needSkipper')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('experience.skipperDesc')}
              </p>
            </div>
          </div>

          {/* Skipper Training Box */}
          <div className="p-4 sm:p-6 bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <div className="flex flex-col items-start">
              <div className="inline-block p-3 bg-blue-500 rounded-full text-white mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Anchor size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {t('experience.needTraining')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('experience.trainingDesc')}
              </p>
            </div>
          </div>

          {/* Pet Friendly Box */}
          <div className="p-4 sm:p-6 bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <div className="flex flex-col items-start">
              <div className="inline-block p-3 bg-blue-500 rounded-full text-white mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Dog size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {t('experience.petFriendly')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('experience.petDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;