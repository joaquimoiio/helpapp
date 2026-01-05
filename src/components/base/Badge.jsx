import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variants = {
    primary: 'bg-[#4F7FFF] text-white',
    success: 'bg-[#22C55E] text-white',
    warning: 'bg-[#FACC15] text-black',
    error: 'bg-[#EF4444] text-white',
    secondary: 'bg-[#1A1F29] text-[#A1A8B3] border border-[#2A2F3A]',
  };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
