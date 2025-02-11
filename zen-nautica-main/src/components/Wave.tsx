import React from 'react';

interface WaveProps {
  inverted?: boolean;
  color?: string;
  className?: string;
}

const Wave: React.FC<WaveProps> = ({ 
  inverted = false, 
  color = 'white',
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden -mt-1 ${className}`} style={{ height: '40px' }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`w-full h-full ${inverted ? 'rotate-180' : ''}`}
      >
        <path
          d="M0,60 
            C240,120 480,0 720,60 
            C960,120 1200,0 1440,60 
            L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Wave;