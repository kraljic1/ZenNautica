import React from 'react';
import ImageGallery from '../ImageGallery';

// Remove the direct CSS import since it's now imported through components.css

interface DestinationGalleryProps {
  images: string[];
  name: string;
}

const DestinationGallery: React.FC<DestinationGalleryProps> = ({ images, name }) => {
  return <ImageGallery images={images} alt={name} />;
};

export default DestinationGallery;