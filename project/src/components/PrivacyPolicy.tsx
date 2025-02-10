import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');
  const navigate = useNavigate();

  const renderList = (key: string) => {
    const items = t(key, { returnObjects: true });
    if (Array.isArray(items)) {
      return items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ));
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-32">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm sm:text-base">{t('backToSite')}</span>
        </button>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
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
  );
};

export default PrivacyPolicy;