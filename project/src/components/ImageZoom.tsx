import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

interface ImageZoomProps {
  src: string;
  alt: string;
  onClose: () => void;
  images?: string[];
  currentIndex?: number;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, onClose, images = [], currentIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const allImages = images.length > 0 ? images : [src];

  useEffect(() => {
    lockScroll();
    
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'instant' });
    }

    const preloadAdjacentImages = () => {
      const imagesToPreload = new Set<string>();
      const prevIndex = activeIndex === 0 ? allImages.length - 1 : activeIndex - 1;
      const nextIndex = activeIndex === allImages.length - 1 ? 0 : activeIndex + 1;
      
      imagesToPreload.add(allImages[activeIndex]);
      imagesToPreload.add(allImages[prevIndex]);
      imagesToPreload.add(allImages[nextIndex]);

      imagesToPreload.forEach(imgSrc => {
        if (!loadedImages.has(imgSrc)) {
          const img = new Image();
          img.onload = () => setLoadedImages(prev => new Set([...prev, imgSrc]));
          img.src = imgSrc;
        }
      });
    };

    preloadAdjacentImages();

    return () => {
      unlockScroll();
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [activeIndex, allImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = activeIndex === 0;
    const newIndex = isFirstSlide ? allImages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = activeIndex === allImages.length - 1;
    const newIndex = isLastSlide ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      distance > 0 ? goToNext() : goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const isImageLoaded = (imgSrc: string) => loadedImages.has(imgSrc);
  const currentImage = allImages[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-black/90 flex items-start md:items-center justify-center overflow-y-auto md:overflow-hidden"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="fixed right-4 top-4 text-white hover:text-gray-300 transition-colors z-50"
      >
        <X size={24} />
      </button>

      <div 
        className="relative w-full min-h-screen md:h-full flex items-start md:items-center justify-center p-4 pt-16 md:pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!isImageLoaded(currentImage) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        <div className="relative max-w-[90vw] max-h-[85vh]">
          <img
            ref={imageRef}
            key={currentImage}
            src={currentImage}
            alt={`${alt} - Image ${activeIndex + 1}`}
            className={`
              w-full h-full object-contain
              transform-gpu transition-opacity duration-150
              ${isImageLoaded(currentImage) ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ willChange: 'transform, opacity' }}
            onLoad={() => {
              if (!loadedImages.has(currentImage)) {
                setLoadedImages(prev => new Set([...prev, currentImage]));
              }
            }}
          />

          {allImages.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      </div>

      {allImages.length > 1 && (
        <div className="fixed bottom-4 left-0 right-0 flex flex-col items-center space-y-2">
          <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
            {activeIndex + 1} / {allImages.length}
          </div>
          <div className="flex space-x-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageZoom;