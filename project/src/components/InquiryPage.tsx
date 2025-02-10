import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ArrowLeft, Calendar, DollarSign, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Navbar from './Navbar';
import TimeSelector from './TimeSelector';
import PrivacyModal from './PrivacyModal';
import CookieConsent from './CookieConsent';

interface InquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "Fwzr6yVuLfaXOOiLb";
const EMAILJS_SERVICE_ID = "service_4yh5g8d";
const EMAILJS_TEMPLATE_ID = "template_7wn71q9";

// Add rate limiting to form submissions
const RATE_LIMIT_DELAY = 2000; // 2 seconds between submissions
let lastSubmissionTime = 0;

const InquiryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('inquiry');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<InquiryFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { boatDetails, dates } = location.state || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_DELAY) {
      setError(t('error.tooMany'));
      return;
    }
    lastSubmissionTime = now;

    setIsSubmitting(true);
    setError(null);

    try {
      const templateParams = {
        to_email: 'contact@zen-nautica.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        boat_name: boatDetails?.name || 'N/A',
        start_date: dates?.startDate || 'N/A',
        end_date: dates?.endDate || 'N/A',
        pickup_time: '09:00 - 10:00',
        dropoff_time: '17:00 - 18:00',
        total_days: dates?.totalDays || 'N/A',
        total_price: dates?.totalPrice ? `€${dates.totalPrice}` : 'N/A',
        reply_to: formData.email
      };

      await emailjs.init(EMAILJS_PUBLIC_KEY);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        setSuccess(true);
      } else {
        setError(t('error.send'));
      }
    } catch (err) {
      setError(t('error.general'));
      console.error('EmailJS error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-32 text-center">
          <p className="text-gray-600 mb-4">{t('noDates')}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            {t('returnHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-32">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm sm:text-base">{t('backToBoat')}</span>
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Boat Details Card */}
          {boatDetails && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="relative h-48 sm:h-56">
                <img 
                  src={boatDetails.image}
                  alt={boatDetails.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">{boatDetails.name}</h2>
                  {dates?.startDate && dates?.endDate && (
                    <div className="flex flex-wrap gap-4 text-sm sm:text-base">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{dates.startDate} - {dates.endDate}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>€{dates.totalPrice}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Booking Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">{t('bookingDetails')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TimeSelector
                label={t('pickupTime')}
                isPickup={true}
              />
              <TimeSelector
                label={t('dropoffTime')}
                isPickup={false}
              />
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">{t('title')}</h1>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="text-green-600 text-xl font-semibold mb-4">
                  {t('success')}
                </div>
                <p className="text-gray-600 mb-6">
                  {t('successDesc')}
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  {t('returnHome')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      {t('firstName')} *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      {t('lastName')} *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('phone')} *
                  </label>
                  <PhoneInput
                    country="hr"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputProps={{
                      id: 'phone',
                      name: 'phone',
                      required: true,
                    }}
                    enableSearch
                    searchPlaceholder="Search countries..."
                    countryCodeEditable={false}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-base sm:text-lg font-medium"
                >
                  {isSubmitting ? t('sending') : t('sendInquiry')}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {t('privacyNotice')}{' '}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    {t('privacyPolicy')}
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default InquiryPage;