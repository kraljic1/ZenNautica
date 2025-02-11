// Utility to check if IntersectionObserver is supported
const supportsIntersectionObserver = 'IntersectionObserver' in window;

// Create a single observer instance to be reused
let imageObserver: IntersectionObserver | null = null;

// Initialize the observer once
const getObserver = () => {
  if (!supportsIntersectionObserver) return null;
  
  if (!imageObserver) {
    imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
  }
  
  return imageObserver;
};

export const lazyLoadImages = () => {
  const observer = getObserver();
  if (!observer) return;

  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
};

export const deferredLoad = (callback: () => void, timeout = 1000) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      try {
        callback();
      } catch (error) {
        console.error('Error in deferred load:', error);
      }
    });
  } else {
    setTimeout(() => {
      try {
        callback();
      } catch (error) {
        console.error('Error in deferred load:', error);
      }
    }, timeout);
  }
};

// Cleanup function to disconnect observer
export const cleanup = () => {
  if (imageObserver) {
    imageObserver.disconnect();
    imageObserver = null;
  }
};