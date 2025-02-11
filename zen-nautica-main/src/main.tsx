import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n/config';
import './index.css';
import { deferredLoad } from './utils/lazyLoad';

// Initialize app with error boundary
const init = () => {
  try {
    const root = createRoot(document.getElementById('root')!);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
};

// Defer non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => init());
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(init, 1);
}

// Preload critical chunks
deferredLoad(() => {
  if ('connection' in navigator && !(navigator as any).connection.saveData) {
    const preloadChunks = [
      '/src/sections/Hero.tsx',
      '/src/sections/Features.tsx'
    ];

    preloadChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = chunk;
      document.head.appendChild(link);
    });
  }
}, 2000);

// Modern cleanup handler using beforeunload
window.addEventListener('beforeunload', () => {
  import('./utils/lazyLoad').then(({ cleanup }) => cleanup());
});