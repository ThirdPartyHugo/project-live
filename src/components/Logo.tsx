import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  return (
    <svg 
      className={`h-8 ${className}`} 
      viewBox="0 0 1270 408.85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        className={variant === 'dark' ? 'fill-[#0c0c0c]' : 'fill-white'}
        d="M504.9,29.4l-97.76,163.54-92.03-.59-18.66-54.68-18.47,54.44-45.58-.29-20.53-67.66,25.91-8.38,15.67,52.54,20.25-64.15,51.73-16.73,30.64,71.69,42.05-95.19,106.79-34.53Z M489.87,123.96c0-48.14,25.96-71.13,86.55-71.13s86.55,23.18,86.55,71.13-26.16,71.52-86.55,71.52-86.55-23.18-86.55-71.52Z M611.82,123.96c0-14.46-5.12-27.54-35.41-27.54s-35.41,12.88-35.41,27.54,5.31,27.94,35.41,27.94,35.41-13.27,35.41-27.94Z"
      />
      {/* Rest of the SVG paths */}
    </svg>
  );
}