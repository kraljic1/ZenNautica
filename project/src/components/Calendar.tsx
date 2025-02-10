import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getMinimumDays } from '../utils/pricing';

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  boatName: string;
}

const Calendar: React.FC<CalendarProps> = ({
  startDate,
  endDate,
  onDateSelect,
  currentMonth,
  onMonthChange,
  boatName
}) => {
  const { t } = useTranslation('calendar');
  
  // Get the arrays from translations
  const DAYS = t('weekDays', { returnObjects: true }) as string[];
  const MONTHS = t('months', { returnObjects: true }) as string[];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay() || 7; // Convert Sunday (0) to 7
    
    // Add empty cells for days before the first day of the month
    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate || !date) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateSelected = (date: Date) => {
    if (!date) return false;
    return (
      startDate?.toDateString() === date.toDateString() ||
      endDate?.toDateString() === date.toDateString()
    );
  };

  const isDateDisabled = (date: Date) => {
    if (!date) return true;
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // If we have a start date, check minimum days requirement
    if (startDate && !endDate) {
      const minDays = getMinimumDays(startDate, boatName);
      const daysDiff = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      if (daysDiff < minDays) return true;
    }

    return false;
  };

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    onMonthChange(newMonth);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label={t('previousMonth')}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label={t('nextMonth')}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {getDaysInMonth(currentMonth).map((date, index) => (
          <button
            key={index}
            onClick={() => date && !isDateDisabled(date) && onDateSelect(date)}
            disabled={!date || isDateDisabled(date)}
            className={`
              p-2 text-sm rounded-full relative
              ${!date ? 'invisible' : ''}
              ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
              ${isDateSelected(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              ${isDateInRange(date) && !isDateSelected(date) ? 'bg-blue-100' : ''}
            `}
            aria-label={date ? t('selectDate', { date: date.toLocaleDateString() }) : ''}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;