import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { deferredLoad } from '../utils/lazyLoad';

const Reviews = () => {
  const { t } = useTranslation('sections');
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    // Defer loading of reviews widget
    deferredLoad(() => {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.defer = true;
      
      // Add widget configuration to filter 5-star reviews
      const config = {
        stars: [5],
        display_review_text: true,
        display_reviewer_photo: true,
        display_name: true,
        display_date: true,
        centered: true,
        review_text_min_length: 10,
        reviews_per_page: 3,
        page_size: "fullwidth",
        carousel_scroll: "auto",
        carousel_arrows: true,
        carousel_dots: true,
        review_card_background: "#ffffff",
        review_card_border_radius: "16px",
        review_card_padding: "24px",
        review_card_shadow: true
      };
      
      window.eapps = window.eapps || {};
      window.eapps.reviewsConfig = config;

      document.body.appendChild(script);
      scriptLoaded.current = true;
    }, 2000); // Delay loading of reviews widget

    return () => {
      if (scriptLoaded.current) {
        const script = document.querySelector('script[src*="elfsight"]');
        if (script) {
          document.body.removeChild(script);
        }
      }
    };
  }, []);

  // Rest of the component remains the same...
  return (
    // Existing JSX...
  );
};

export default Reviews;