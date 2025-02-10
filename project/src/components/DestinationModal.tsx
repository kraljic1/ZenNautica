import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Anchor, Info, Navigation, Ship, SwissFranc as Swim, Fish, Bird, Camera } from 'lucide-react';
import ImageGallery from './ImageGallery';
import { useTranslation } from 'react-i18next';
import { destinations } from '../data/destinations';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationId: string;
  name: string;
  description: string;
  images: string[];
}

const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  destinationId,
  name,
  description,
  images
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'info' | 'route'>('gallery');
  const [selectedRoute, setSelectedRoute] = useState(0);
  const { t } = useTranslation(['destinations']);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    }
    
    return () => {
      if (isOpen) {
        unlockScroll();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Find the destination data
  const destinationData = destinations.find(d => d.id === destinationId);

  const getTranslatedWaypointInfo = (waypoint: any) => ({
    ...waypoint,
    name: t(`waypoints.${waypoint.id}.name`, { defaultValue: waypoint.name }),
    description: t(`waypoints.${waypoint.id}.description`, { defaultValue: waypoint.description })
  });

  // Get routes based on destination
  const getRoutes = () => {
    if (!destinationData) return [];

    if (destinationData.routes) {
      return destinationData.routes.map(route => ({
        ...route,
        name: t(`modal.route.routes.${route.id.replace('_route', '')}`, { defaultValue: route.name }),
        waypoints: route.waypoints.map(getTranslatedWaypointInfo)
      }));
    }

    if (destinationData.waypoints) {
      return [{
        id: 'main',
        name: t('modal.route.main_route'),
        waypoints: destinationData.waypoints.map(getTranslatedWaypointInfo)
      }];
    }

    return [];
  };

  const routes = getRoutes();
  const hasRoutes = routes.length > 0;

  // Get icon for activity
  const getActivityIcon = (activity: string) => {
    switch (activity.toLowerCase()) {
      case 'swimming':
        return <Swim className="w-5 h-5" />;
      case 'snorkeling':
        return <Swim className="w-5 h-5" />;
      case 'fishing':
        return <Fish className="w-5 h-5" />;
      case 'bird watching':
      case 'bird_watching':
        return <Bird className="w-5 h-5" />;
      case 'cave watching':
      case 'cave_exploration':
        return <Camera className="w-5 h-5" />;
      default:
        return <Ship className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div 
          className="relative inline-block w-full max-w-6xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header with Close Button and Tabs */}
          <div className="relative flex items-center justify-center mb-6">
            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-1">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all ${
                  activeTab === 'gallery' 
                    ? 'bg-blue-600 text-white shadow-md scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('modal.tabs.gallery')}
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all ${
                  activeTab === 'info'
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('modal.tabs.info')}
              </button>
              {hasRoutes && (
                <button
                  onClick={() => setActiveTab('route')}
                  className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all ${
                    activeTab === 'route'
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t('modal.tabs.route')}
                </button>
              )}
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute right-0 p-2 text-gray-400 hover:text-gray-500 transition-colors"
              style={{ marginRight: '-8px' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="mt-8">
            {activeTab === 'gallery' && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <ImageGallery images={images} alt={name} />
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <section className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="flex items-center text-lg font-semibold mb-3">
                        <Info className="w-5 h-5 mr-2 text-blue-600" />
                        {t('modal.info.about')}
                      </h3>
                      <p className="text-gray-600">{description}</p>
                    </section>

                    {destinationData?.activities && (
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="flex items-center text-lg font-semibold mb-3">
                          <Ship className="w-5 h-5 mr-2 text-blue-600" />
                          {t('modal.activities.title')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {destinationData.activities.map((activity, index) => {
                            const translationKey = activity.toLowerCase().replace(/ /g, '_');
                            return (
                              <div 
                                key={index}
                                className="bg-white p-3 rounded-lg text-sm font-medium text-gray-700 flex items-center space-x-3 
                                         transform transition-all duration-300 hover:scale-105 hover:shadow-md group"
                              >
                                <div className="text-blue-600 group-hover:scale-110 transition-transform">
                                  {getActivityIcon(activity)}
                                </div>
                                <span className="group-hover:text-blue-600 transition-colors">
                                  {t(`activities.${translationKey}`)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <section className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="flex items-center text-lg font-semibold mb-3 text-blue-600">
                        <Clock className="w-5 h-5 mr-2" />
                        {t('modal.info.planning_tips')}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {t('modal.info.tips.morning')}
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {t('modal.info.tips.weather')}
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {t('modal.info.tips.essentials')}
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {t('modal.info.tips.wind')}
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'route' && hasRoutes && routes.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">{t('modal.route.title')}</h2>
                
                {routes.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {routes.map((route, index) => (
                      <button
                        key={route.id}
                        onClick={() => setSelectedRoute(index)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          selectedRoute === index
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {route.name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="max-w-3xl mx-auto">
                  <div className="space-y-6">
                    {routes[selectedRoute].waypoints.map((waypoint, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                            </div>
                            {index < routes[selectedRoute].waypoints.length - 1 && (
                              <div className="w-0.5 h-24 bg-blue-100"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <h3 className="text-lg font-semibold text-gray-900">{waypoint.name}</h3>
                              <p className="text-gray-600 mt-1">{waypoint.description}</p>
                              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Navigation className="w-4 h-4 mr-1" />
                                  {waypoint.distance}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {waypoint.duration}
                                </span>
                              </div>
                            </div>
                            {waypoint.image && (
                              <div className="mt-4">
                                <img 
                                  src={waypoint.image} 
                                  alt={waypoint.name}
                                  className="w-full h-48 object-cover rounded-xl"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;