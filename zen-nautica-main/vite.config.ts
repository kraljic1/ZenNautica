import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-i18n': ['i18next', 'react-i18next'],
          'vendor-ui': ['lucide-react'],
          
          // Feature-based code splitting
          'feature-fleet': ['./src/sections/Fleet.tsx'],
          'feature-destinations': ['./src/sections/Destinations.tsx'],
          'feature-faq': ['./src/sections/FAQ.tsx'],
          'feature-video': ['./src/sections/VideoSection.tsx'],
          
          // Utilities and shared code
          'utils': ['./src/utils/pricing.ts', './src/utils/scrollLock.ts', './src/utils/lazyLoad.ts']
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    exclude: ['@emailjs/browser']
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  }
});