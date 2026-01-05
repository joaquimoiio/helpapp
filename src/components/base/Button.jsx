import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const base = 'px-4 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#4F7FFF] text-white hover:bg-[#6B8FFF] active:bg-[#3D6FEF]',
    secondary: 'bg-[#1A1F29] text-white hover:bg-[#242933] border border-[#2A2F3A]',
    ghost: 'text-[#A1A8B3] hover:bg-[#1A1F29]',
    success: 'bg-[#22C55E] text-white hover:bg-[#16A34A]',
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${base} ${variants[variant]} ${width} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
