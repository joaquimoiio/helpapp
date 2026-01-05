import React from 'react';

export const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  icon = null,
  iconPosition = 'left',
  error = null,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'glass border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-500/20 outline-none transition-all duration-300';
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/20' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const iconPaddingLeft = icon && iconPosition === 'left' ? 'pl-12' : '';
  const iconPaddingRight = icon && iconPosition === 'right' ? 'pr-12' : '';

  return (
    <div className={`relative ${widthClass}`}>
      {icon && iconPosition === 'left' && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${errorStyles} ${iconPaddingLeft} ${iconPaddingRight} ${widthClass} ${className}`}
        {...props}
      />
      {icon && iconPosition === 'right' && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
