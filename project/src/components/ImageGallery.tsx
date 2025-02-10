import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { deferredLoad } from '../utils/lazyLoad';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const preloadImages = useCallback(() => {
    const imagesToLoad = images.slice(0, 2); // Only preload first two images initially
    
    imagesToLoad.forEach(src => {
      if (!loadedImages.has(src)) {
        const img = new Image();
        img.onload = () => setLoadedImages(prev => new Set([...prev, src]));
        img.src = src;
      }
    });
  }, [images, loadedImages]);

  useEffect(() => {
    // Defer image preloading
    deferredLoad(() => preloadImages());
  }, [preloadImages]);

  // Preload next image when current index changes
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex];
    
    if (!loadedImages.has(nextImage)) {
      deferredLoad(() => {
        const img = new Image();
        img.onload = () => setLoadedImages(prev => new Set([...prev, nextImage]));
        img.src = nextImage;
      });
    }
  }, [currentIndex, images, loadedImages]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(slideIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const isImageLoaded = (src: string) => loadedImages.has(src);
  const currentImage = images[currentIndex];

  return (
    <div className="relative h-full bg-black">
      <div className="relative h-full flex items-center justify-center">
        {!isImageLoaded(currentImage) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        <img
          src={currentImage}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className={`
            max-h-full w-auto object-contain transition-all duration-300
            ${isImageLoaded(currentImage) ? 'opacity-100' : 'opacity-0'}
            ${isTransitioning ? 'scale-95' : 'scale-100'}
          `}
          style={{ willChange: 'transform, opacity' }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTransitioning}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTransitioning}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`
                  w-2.5 h-2.5 rounded-full transition-colors disabled:cursor-not-allowed
                  ${currentIndex === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'}
                `}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;