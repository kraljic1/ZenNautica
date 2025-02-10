import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import ImageZoom from './ImageZoom';

interface ImageSliderProps {
  images: string[];
  alt: string;
  title?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(true);
      const loadPromises = images.map(src => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, src]));
            resolve(src);
          };
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(loadPromises);
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadImages();

    return () => {
      setLoadedImages(new Set());
    };
  }, [images]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!images.length) return null;

  const isImageLoaded = (src: string) => loadedImages.has(src);
  const currentImage = images[currentIndex];

  return (
    <>
      <div className="relative w-full aspect-[4/3] group">
        <div className="w-full h-full overflow-hidden rounded-lg bg-gray-100">
          {isLoading && !isImageLoaded(currentImage) ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              {/* Preload adjacent images */}
              <div className="hidden">
                {images.map((src, idx) => (
                  idx !== currentIndex && (
                    <img key={src} src={src} alt="" className="hidden" />
                  )
                ))}
              </div>
              
              <img
                src={currentImage}
                alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
                title={title ? `${title} - Image ${currentIndex + 1}` : undefined}
                className="w-full h-full object-contain transform-gpu transition-transform duration-300 ease-out"
                style={{ willChange: 'transform' }}
              />
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
        
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(slideIndex);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isZoomed && (
        <ImageZoom
          src={currentImage}
          alt={`${alt} - Image ${currentIndex + 1}`}
          onClose={() => setIsZoomed(false)}
          images={images}
          currentIndex={currentIndex}
        />
      )}
    </>
  );
};

export default ImageSlider;