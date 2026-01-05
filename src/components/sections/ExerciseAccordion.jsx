import React, { useState } from 'react';
import { IconChevronDown } from '../base/Icons';
import { Badge } from '../base';

export const ExerciseAccordion = ({ title, count, description, exercises }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className={`glass rounded-2xl overflow-hidden border transition-all duration-300 mb-5 ${
      isOpen ? 'border-indigo-500/40 shadow-lg shadow-indigo-500/20' : 'border-white/10'
    }`}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-all duration-300 tap-effect"
      >
        <div className="flex items-center gap-4">
          <div className={`w-1.5 h-10 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-gradient-to-b from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/50' : 'bg-indigo-500/50'
          }`} />
          <div className="text-left">
            <h3 className="font-bold text-white text-lg font-display">{title}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="primary" size="sm">{count}</Badge>
              <span className="text-xs text-gray-400">exercícios</span>
            </div>
          </div>
        </div>
        <div className={`transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-gray-500'}`}>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <IconChevronDown />
          </div>
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-5 pt-3 border-t border-white/10 animate-slide-down">
          <p className="text-xs text-gray-400 italic mb-4 pb-3 border-b border-white/5 leading-relaxed">
            {description}
          </p>
          <div className="space-y-3">
            {exercises.map((exercise, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 border border-white/10 hover:border-indigo-500/40 hover:shadow-md transition-all duration-300 cursor-pointer tap-effect"
              >
                <button
                  onClick={() => setSelectedExercise(selectedExercise === i ? null : i)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-sm font-bold text-white flex-1">{exercise.name}</h4>
                    <Badge variant="outline" size="sm">{exercise.duration}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{exercise.description}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      selectedExercise === i ? 'bg-indigo-500 text-white rotate-180' : 'bg-white/10 text-gray-500'
                    }`}>
                      <IconChevronDown />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {selectedExercise === i ? 'Ocultar instruções' : 'Ver como fazer'}
                    </span>
                  </div>
                </button>

                {selectedExercise === i && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-slide-down">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                        <span className="text-sm">📋</span>
                      </div>
                      <h5 className="text-sm font-bold text-indigo-400">Como Executar</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed glass-subtle rounded-lg p-3 border border-white/5">
                      {exercise.howTo}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
