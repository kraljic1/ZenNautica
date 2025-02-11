import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation('hero');

  return (
    <div className="relative h-[90vh] md:h-screen">
      {/* Hero Background with optimized loading */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-100"
        style={{
          backgroundImage: "url('https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/67641b2e7e62115615abca0e.jpeg')",
        }}
        role="img"
        aria-label="Aerial view of crystal clear Adriatic Sea with boats"
      >
        {/* Preload hero image */}
        <link 
          rel="preload" 
          as="image" 
          href="https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/67641b2e7e62115615abca0e.jpeg"
          fetchpriority="high"
        />
        
        {/* Add a low-res background color while image loads */}
        <div className="absolute inset-0 bg-[#1E3A8A] mix-blend-multiply opacity-30"></div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO-friendly business name */}
          <h1 className="sr-only">
            Zen Nautica - Premium Boat Rental in Malinska, Croatia
          </h1>

          {/* Visible main heading with responsive typography */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 
                       leading-tight tracking-tight animate-fade-in">
            {t('title')}
          </h2>

          {/* Subtitle with responsive typography */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 
                       leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
            {t('subtitle')}
          </p>

          {/* SEO Description */}
          <p className="sr-only">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;