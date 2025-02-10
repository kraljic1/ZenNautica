import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Map, Ship } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('nav');

  const quickLinks = [
    { icon: Ship, label: t('fleet'), href: '/#fleet' },
    { icon: Map, label: t('destinations'), href: '/#destinations' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-blue-600 opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Ship className="w-24 h-24 text-blue-600 animate-[bounce_3s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! You've sailed off course
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have drifted away. Let's help you navigate back to familiar waters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <Home className="w-5 h-5 mr-2" />
            <span>Return Home</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;