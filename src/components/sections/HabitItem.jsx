import React from 'react';
import { IconCheck } from '../base/Icons';

export const HabitItem = ({ habit, checked, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`group flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 border tap-effect ${
        checked
          ? 'glass-strong border-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-[0.98]'
          : 'glass border-white/10 hover:border-indigo-500/30 hover:shadow-md hover:shadow-indigo-500/10'
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Ícone do hábito */}
        <div className={`text-4xl transition-all duration-300 ${
          checked ? 'scale-110 animate-float' : 'scale-100 group-hover:scale-105'
        }`}>
          {habit.icon}
        </div>

        {/* Informações */}
        <div className="flex-1">
          <h3 className={`font-bold text-base transition-colors duration-300 ${
            checked ? 'text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text' : 'text-white'
          }`}>
            {habit.label}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed mt-1">{habit.desc}</p>
        </div>
      </div>

      {/* Checkbox */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
        checked
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 scale-110 shadow-lg shadow-indigo-500/40'
          : 'border-gray-600 group-hover:border-indigo-500/50 group-hover:scale-105'
      }`}>
        {checked && (
          <div className="text-white animate-scale-in">
            <IconCheck />
          </div>
        )}
      </div>
    </div>
  );
};
