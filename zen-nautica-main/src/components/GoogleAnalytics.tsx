import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CookieConsent from './CookieConsent';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const TRACKING_ID = 'G-WWHHVK3RK2';

const GoogleAnalytics = () => {
  const location = useLocation();
  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem('cookieConsent') === 'true';
  });

  const initializeGA = () => {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.gtag = function() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', TRACKING_ID, {
      page_path: location.pathname + location.search
    });

    return () => {
      document.head.removeChild(script);
    };
  };

  useEffect(() => {
    if (hasConsent) {
      initializeGA();
    }
  }, [hasConsent]);

  // Track page views
  useEffect(() => {
    if (hasConsent) {
      window.gtag?.('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location, hasConsent]);

  return <CookieConsent onAccept={() => setHasConsent(true)} />;
};

export default GoogleAnalytics;