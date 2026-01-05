import React, { useState } from 'react';
import { EXERCISES_DATA } from '../data/exercises';
import { Card } from '../components/base';
import { IconChevronDown } from '../components/base/Icons';

export const WorkoutView = () => {
  const [openSection, setOpenSection] = useState(null);
  const [expandedExercise, setExpandedExercise] = useState(null);

  return (
    <div className="pb-24 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Treinos</h1>
        <p className="text-sm text-[#A1A8B3]">Exercícios para fazer em casa</p>
      </div>

      <div className="space-y-3">
        {EXERCISES_DATA.map((section, idx) => {
          const isOpen = openSection === idx;
          return (
            <Card key={idx} className="p-0 overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : idx)}
                className="w-full p-4 flex items-center justify-between hover:bg-[#242933] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#4F7FFF] rounded-full" />
                  <div className="text-left">
                    <h3 className="font-semibold text-white">{section.category}</h3>
                    <p className="text-xs text-[#6B7280]">{section.items.length} exercícios</p>
                  </div>
                </div>
                <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  <IconChevronDown />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 space-y-2 border-t border-[#2A2F3A]">
                  {section.items.map((exercise, i) => {
                    const exerciseKey = `${idx}-${i}`;
                    const isExpanded = expandedExercise === exerciseKey;
                    return (
                      <div key={i} className="bg-[#0F1419] rounded-lg p-3">
                        <button
                          onClick={() => setExpandedExercise(isExpanded ? null : exerciseKey)}
                          className="w-full text-left"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{exercise.name}</p>
                              <p className="text-xs text-[#6B7280]">{exercise.duration}</p>
                            </div>
                            <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                              <IconChevronDown />
                            </div>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-[#2A2F3A] space-y-2">
                            <p className="text-sm text-[#A1A8B3]">{exercise.description}</p>
                            <div className="bg-[#4F7FFF]/10 border border-[#4F7FFF]/30 rounded-lg p-2">
                              <p className="text-xs text-white">
                                <span className="font-semibold">Como fazer:</span> {exercise.howTo}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold text-white mb-3">💡 Dicas</h3>
        <ul className="space-y-2 text-sm text-[#A1A8B3]">
          <li>• Aqueça 5-10 min antes de treinar</li>
          <li>• Descanse 60-90s entre séries</li>
          <li>• Mantenha a forma correta</li>
          <li>• Treine 4-6x por semana</li>
        </ul>
      </Card>
    </div>
  );
};
