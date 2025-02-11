import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  label: string;
  isPickup?: boolean;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ label, isPickup = false }) => {
  const timeRange = isPickup ? "09:00 - 10:00" : "17:00 - 18:00";
  const dotPosition = isPickup ? 
    ((9.5 * 60) / (24 * 60) * 100) : // 9:30 (middle of 9-10)
    ((17.5 * 60) / (24 * 60) * 100); // 17:30 (middle of 17-18)
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700 font-medium">{timeRange}</span>
        </div>
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
        <div 
          className="absolute w-4 h-4 bg-blue-600 rounded-full -mt-1 transform -translate-x-1/2 transition-all duration-300"
          style={{
            left: `${dotPosition}%`,
          }}
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>00:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
};

export default TimeSelector;