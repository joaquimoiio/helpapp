import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  const base = 'bg-[#1A1F29] rounded-xl border border-[#2A2F3A] p-4';
  const clickable = onClick ? 'cursor-pointer hover:bg-[#242933]' : '';

  return (
    <div
      className={`${base} ${clickable} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
