import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('privacy');

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

  const renderList = (key: string) => {
    const items = t(key, { returnObjects: true });
    if (Array.isArray(items)) {
      return items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ));
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto pt-20">
      <div className="flex min-h-screen items-start justify-center px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-16 sm:w-full sm:max-w-4xl sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4 z-10">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
            
            <div className="space-y-6 text-gray-600">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('introduction.title')}</h2>
                <p>{t('introduction.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('dataCollection.title')}</h2>
                <p>{t('dataCollection.content')}</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  {renderList('dataCollection.items')}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('cookies.title')}</h2>
                <p>{t('cookies.content')}</p>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('cookies.types.title')}</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">{t('cookies.types.necessary.title')}</span>
                      <p className="text-sm">{t('cookies.types.necessary.description')}</p>
                    </li>
                    <li>
                      <span className="font-medium">{t('cookies.types.analytics.title')}</span>
                      <p className="text-sm">{t('cookies.types.analytics.description')}</p>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('dataUsage.title')}</h2>
                <p>{t('dataUsage.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('dataProtection.title')}</h2>
                <p>{t('dataProtection.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('userRights.title')}</h2>
                <p>{t('userRights.content')}</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  {renderList('userRights.items')}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('contact.title')}</h2>
                <p>{t('contact.content')}</p>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900">Zen Nautica</p>
                  <p>Email: privacy@zen-nautica.com</p>
                  <p>Obala 22, 51511, Malinska, Croatia</p>
                </div>
              </section>

              <section className="text-sm text-gray-500">
                <p>{t('lastUpdated', { date: '2024-02-03' })}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;