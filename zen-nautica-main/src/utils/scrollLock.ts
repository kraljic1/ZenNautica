// Store the original body overflow style
let originalStyle: string | null = null;

// Store the original scroll position
let scrollPosition = 0;

export const lockScroll = () => {
  // Store current scroll position
  scrollPosition = window.scrollY;
  
  // Store original body overflow
  originalStyle = document.body.style.overflow;
  
  // Add styles to lock scroll
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
};

export const unlockScroll = () => {
  // Restore original body overflow
  document.body.style.overflow = originalStyle || '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Restore scroll position
  window.scrollTo(0, scrollPosition);
};