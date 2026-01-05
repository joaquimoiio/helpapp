import React from 'react';

export const ProgressRing = ({ progress, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export const ProgressCard = ({ progress, completed, total, motivationMessage }) => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-500/20 via-purple-600/20 to-pink-500/20 rounded-3xl p-6 mb-6 border border-white/10 shadow-xl overflow-hidden animate-slide-up">
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect opacity-30" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <span className="block text-gray-400 text-xs mb-2 uppercase tracking-wider font-semibold">Progresso do Dia</span>
            <h2 className="text-6xl font-bold bg-gradient-to-br from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent font-display">
              {Math.round(progress)}%
            </h2>
            <p className="text-sm text-indigo-300 mt-2 font-semibold">
              {completed} de {total} hábitos
            </p>
          </div>
          <div className="animate-float">
            <ProgressRing progress={progress} size={110} strokeWidth={8} />
          </div>
        </div>

        <div className="glass-strong rounded-xl p-4 border border-white/10">
          <p className="text-sm text-white font-semibold text-center leading-relaxed">
            {motivationMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
