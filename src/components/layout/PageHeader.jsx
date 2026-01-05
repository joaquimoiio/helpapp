import React from 'react';

export const PageHeader = ({ title, subtitle, icon, badge = null, action = null }) => {
  return (
    <header className="mb-8 animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {icon && (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30 animate-float">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white font-display">{title}</h1>
              {badge}
            </div>
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </header>
  );
};
