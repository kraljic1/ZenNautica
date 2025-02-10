import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DestinationModal from './DestinationModal';

interface DestinationCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  gallery?: string[];
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  name,
  description,
  image,
  gallery = []
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation(['destinations', 'translation']);

  // For "Your own idea?", don't show the modal
  const handleClick = () => {
    if (id === "custom") {
      // You could add a contact form or other action here
      return;
    }
    setIsModalOpen(true);
  };

  // For custom destination, use the translation from translation.json
  const displayName = id === "custom" 
    ? t('destinations.customIdea.title', { ns: 'translation' })
    : name;
  
  const displayDescription = id === "custom"
    ? t('destinations.customIdea.description', { ns: 'translation' })
    : description;

  // Combine main image with gallery images, ensuring no duplicates and max 5 images
  const allImages = id === "custom" 
    ? [image]
    : [image, ...(gallery || [])].filter((img, index, self) => 
        self.indexOf(img) === index
      ).slice(0, 5);

  const buttonText = id === "custom" ? t('modal.contact_us') : t('modal.explore');

  return (
    <>
      <div className="relative group overflow-hidden rounded-lg shadow-lg h-80 sm:h-96 md:h-72 lg:h-96">
        <img
          src={image}
          alt={`${name} - Boat destination in Croatia - Explore beautiful locations around Krk Island`}
          title={`Visit ${name} by boat from Malinska`}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-4 lg:p-6 text-white">
          <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold mb-2">{displayName}</h3>
          <p className="text-gray-200 text-sm sm:text-base md:text-sm lg:text-base">{displayDescription}</p>
          <button 
            onClick={handleClick}
            className="mt-4 bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-full hover:bg-blue-50 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base md:text-sm lg:text-base"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {id !== "custom" && (
        <DestinationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          destinationId={id}
          name={displayName}
          description={displayDescription}
          images={allImages}
        />
      )}
    </>
  );
};

export default DestinationCard;