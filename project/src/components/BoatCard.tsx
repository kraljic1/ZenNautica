import React, { useState } from 'react';
import { Users, Ruler, Ship, Radio, Droplets, Fuel, Dog, Maximize, ChevronRight, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import Calendar from './Calendar';
import ImageSlider from './ImageSlider';
import { calculateTotalPrice, calculateDailyPrice, calculateDailyPriceWithDiscount } from '../utils/pricing';

interface BoatCardProps {
  name: string;
  type: string;
  length: string;
  width: string;
  capacity: string;
  engine: string;
  price: string;
  image: string;
  images?: string[];
  fuelTank: string;
  hasRadio: boolean;
  hasNavigation: boolean;
  hasShower: boolean;
  petsAllowed: boolean;
  description: {
    en: string;
    de: string;
    it: string;
    hr: string;
    hu: string;
    sl: string;
  };
}

const BoatCard: React.FC<BoatCardProps> = ({
  name,
  type,
  length,
  width,
  capacity,
  engine,
  price,
  image,
  images = [],
  fuelTank,
  hasRadio,
  hasNavigation,
  hasShower,
  petsAllowed,
  description
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['boat', 'calendar']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const allImages = [image, ...images.filter(img => img !== image)];

  const getTranslatedType = (type: string) => {
    const key = type.toLowerCase().replace(/ /g, '_');
    return t(`types.${key}`, { defaultValue: type });
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const getDailyPriceInfo = () => {
    const days = calculateTotalDays();
    if (days === 0) {
      return { original: 0, discounted: 0, discountPercentage: 0 };
    }
    return calculateDailyPriceWithDiscount(startDate!, days, name);
  };

  const calculateTotalSavings = () => {
    if (!startDate || !endDate) return 0;
    const days = calculateTotalDays();
    const priceInfo = getDailyPriceInfo();
    return Math.round((priceInfo.original - priceInfo.discounted) * days);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleInquiry = () => {
    navigate('/inquiry', {
      state: {
        boatDetails: {
          name,
          type,
          length,
          capacity,
          engine,
          price: calculateDailyPrice(new Date(), name).toString(),
          image
        },
        dates: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          totalDays: calculateTotalDays(),
          totalPrice: calculateTotalPrice(startDate!, endDate!, name)
        }
      }
    });
  };

  const specifications = [
    { icon: <Ship className="w-5 h-5" />, label: t('type'), value: getTranslatedType(type) },
    { icon: <Ruler className="w-5 h-5" />, label: t('length'), value: length },
    { icon: <Maximize className="w-5 h-5" />, label: t('width'), value: width },
    { icon: <Users className="w-5 h-5" />, label: t('capacity'), value: `${capacity} ${t('persons')}` },
    { icon: <Ship className="w-5 h-5" />, label: t('engine'), value: engine },
    { icon: <Fuel className="w-5 h-5" />, label: t('fuelTank'), value: fuelTank },
    { icon: <Radio className="w-5 h-5" />, label: t('radio'), value: hasRadio ? t('yes') : t('no') },
    { icon: <Navigation className="w-5 h-5" />, label: t('navigation'), value: hasNavigation ? t('yes') : t('no') },
    { icon: <Droplets className="w-5 h-5" />, label: t('shower'), value: hasShower ? t('yes') : t('no') },
    { icon: <Dog className="w-5 h-5" />, label: t('petsAllowed'), value: petsAllowed ? t('yes') : t('no') }
  ];

  const priceInfo = getDailyPriceInfo();
  const totalSavings = calculateTotalSavings();

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
        <div className="relative h-48 sm:h-56 md:h-52 lg:h-64 overflow-hidden">
          <img
            src={image}
            alt={`${name} - ${type} boat rental in Malinska, Croatia - ${length} length, ${capacity} persons capacity`}
            title={`Rent ${name} ${type} boat in Malinska`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base">
            {calculateTotalDays() === 0 ? (
              <span>€{calculateDailyPrice(new Date(), name)}{t('perDay')}</span>
            ) : (
              <>
                €{priceInfo.original}{t('perDay')}
                {priceInfo.discountPercentage > 0 && (
                  <div className="text-xs font-medium mt-1">
                    {t('discountInfo.save', { percentage: priceInfo.discountPercentage, ns: 'calendar' })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-4 lg:p-6">
          <h3 className="text-lg sm:text-xl md:text-lg lg:text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm sm:text-base md:text-sm lg:text-base mb-4">{getTranslatedType(type)}</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-2 lg:gap-4 text-gray-600 text-sm mb-4">
            <div className="flex items-center justify-start sm:justify-center">
              <Ruler className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2" />
              <span>{length}</span>
            </div>
            <div className="flex items-center justify-start sm:justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2" />
              <span>{capacity} {t('persons')}</span>
            </div>
            <div className="flex items-center justify-start sm:justify-center">
              <Ship className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2" />
              <span>{engine}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 group"
            aria-label={`View details for ${name} boat`}
          >
            <span>{t('viewDetails')}</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <ImageSlider 
                images={allImages} 
                alt={`${name} - ${type} boat rental in Malinska, Croatia`}
                title={`View ${name} boat gallery`}
              />
              <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold mt-6 mb-4">{name}</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-3 lg:gap-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <div className="text-blue-600">{spec.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500">{spec.label}</p>
                      <p className="font-medium text-sm sm:text-base md:text-sm lg:text-base">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg">
                <Calendar
                  startDate={startDate}
                  endDate={endDate}
                  onDateSelect={handleDateSelect}
                  currentMonth={currentMonth}
                  onMonthChange={setCurrentMonth}
                  boatName={name}
                />
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('checkIn', { ns: 'calendar' })}:</span>
                    <span className="font-semibold">
                      {formatDate(startDate) || t('selectDatePlaceholder', { ns: 'calendar' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('checkOut', { ns: 'calendar' })}:</span>
                    <span className="font-semibold">
                      {formatDate(endDate) || t('selectDatePlaceholder', { ns: 'calendar' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('dailyRate', { ns: 'calendar' })}:</span>
                    <div className="text-right">
                      {calculateTotalDays() === 0 ? (
                        <span className="text-gray-500">-</span>
                      ) : priceInfo.discountPercentage > 0 ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">€{priceInfo.original}</span>
                          <span className="font-semibold">€{priceInfo.discounted}</span>
                          <span className="ml-2 text-green-600 text-sm">
                            (-{priceInfo.discountPercentage}%)
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold">€{priceInfo.original}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('daysSelected', { ns: 'calendar' })}:</span>
                    <span className="font-semibold">{calculateTotalDays()}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg mt-2">
                      <p className="text-green-700 font-medium text-center">
                        {t('discountInfo.youSave', { amount: totalSavings, ns: 'calendar' })}
                      </p>
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    {calculateTotalDays() === 0 ? (
                      <>
                        {t('discountInfo.threeDays', { ns: 'calendar' })}<br />
                        {t('discountInfo.fiveDays', { ns: 'calendar' })}<br />
                        {t('discountInfo.tenDays', { ns: 'calendar' })}
                      </>
                    ) : (
                      t('daysSelected', { days: calculateTotalDays(), ns: 'calendar' })
                    )}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        €{calculateTotalPrice(startDate!, endDate!, name)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleInquiry}
                disabled={!startDate || !endDate}
              >
                {startDate && endDate ? t('sendInquiry') : t('selectDates')}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BoatCard;