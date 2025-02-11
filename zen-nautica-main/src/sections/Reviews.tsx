import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const Reviews = () => {
  const { t } = useTranslation('sections');

  useEffect(() => {
    // Create script element for Google Reviews widget
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.defer = true;
    
    // Add widget configuration to filter 5-star reviews
    const config = {
      stars: [5], // Only show 5-star reviews
      display_review_text: true,
      display_reviewer_photo: true,
      display_name: true,
      display_date: true,
      centered: true,
      review_text_min_length: 10, // Only show reviews with meaningful text
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
    
    // Add configuration to window object
    window.eapps = window.eapps || {};
    window.eapps.reviewsConfig = config;

    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read authentic 5-star reviews from our valued customers who have experienced unforgettable moments with Zen Nautica
          </p>
        </div>

        {/* Google Reviews Widget */}
        <div className="elfsight-app-0c21af5f-c5e6-4a8d-b9b5-d1c5b5e6c5a7"></div>
      </div>
    </section>
  );
};

export default Reviews;