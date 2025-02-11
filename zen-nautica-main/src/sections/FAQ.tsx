import React, { useState } from 'react';
import { ChevronDown, MapPin, Fuel, Clock, DollarSign, Users, SkipBack as Ski } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon, isOpen, onClick }) => {
  return (
    <div 
      className={`
        border-b border-gray-200 last:border-0 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'bg-blue-50/50' : 'hover:bg-gray-50'}
        first:rounded-t-[2rem] last:rounded-b-[2rem]
      `}
    >
      <button
        className="w-full py-6 px-8 text-left flex items-start justify-between focus:outline-none group"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className={`
            p-3 rounded-2xl transition-all duration-300
            ${isOpen 
              ? 'bg-blue-100 text-blue-600 rotate-3 scale-110' 
              : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500'
            }
          `}>
            {icon}
          </div>
          <span className={`
            text-lg font-medium transition-all duration-300
            ${isOpen 
              ? 'text-blue-600' 
              : 'text-gray-900 group-hover:text-blue-600'
            }
          `}>
            {question}
          </span>
        </div>
        <ChevronDown 
          className={`
            w-5 h-5 transition-all duration-300 flex-shrink-0
            ${isOpen 
              ? 'transform rotate-180 text-blue-600' 
              : 'text-gray-400 group-hover:text-blue-500'
            }
          `}
        />
      </button>
      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-8 pb-6">
          <div className="pl-16 pr-4 text-gray-600 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-100 rounded-full"></div>
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation('faq');

  const faqs = [
    {
      icon: <MapPin className="w-6 h-6" />,
      question: t('location.question'),
      answer: t('location.answer')
    },
    {
      icon: <Fuel className="w-6 h-6" />,
      question: t('gasStation.question'),
      answer: t('gasStation.answer')
    },
    {
      icon: <Clock className="w-6 h-6" />,
      question: t('longerRental.question'),
      answer: t('longerRental.answer')
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      question: t('fuel.question'),
      answer: t('fuel.answer')
    },
    {
      icon: <Users className="w-6 h-6" />,
      question: t('skipper.question'),
      answer: t('skipper.answer')
    },
    {
      icon: <Ski className="w-6 h-6" />,
      question: t('equipment.question'),
      answer: (
        <div className="space-y-4">
          <p>{t('equipment.answer.intro')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center p-3 bg-white rounded-2xl shadow-sm">
              <span className="text-blue-500 mr-2">✔</span>
              <span><strong className="font-bold">{t('equipment.answer.donuts')}</strong> 🍩</span>
            </div>
            <div className="flex items-center p-3 bg-white rounded-2xl shadow-sm">
              <span className="text-blue-500 mr-2">✔</span>
              <span><strong className="font-bold">{t('equipment.answer.wakeboard')}</strong> 🏄‍♂️</span>
            </div>
            <div className="flex items-center p-3 bg-white rounded-2xl shadow-sm">
              <span className="text-blue-500 mr-2">✔</span>
              <span><strong className="font-bold">{t('equipment.answer.waterSkis')}</strong> 🎿</span>
            </div>
          </div>
          <p className="text-blue-600 font-medium">
            {t('equipment.answer.contact')} 🚤✨
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              {t('title')}
            </h2>
            <p className="text-gray-600">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                icon={faq.icon}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;