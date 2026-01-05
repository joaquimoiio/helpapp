import React from 'react';
import { HABITS_LIST } from '../data/habits';
import { Card } from '../components/base';
import { IconCheck } from '../components/base/Icons';

export const HomeView = ({ habitsStatus, toggleHabit, progress }) => {
  const completedCount = Object.values(habitsStatus).filter(Boolean).length;
  const totalCount = HABITS_LIST.length;

  const getTodayDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="pb-24 pt-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Vitalis</h1>
        <p className="text-sm text-[#A1A8B3] capitalize">{getTodayDate()}</p>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-[#A1A8B3] mb-1">Progresso Diário</p>
            <p className="text-3xl font-bold text-white">{Math.round(progress)}%</p>
          </div>
          <div className="text-5xl">
            {progress === 100 ? '🏆' : progress > 50 ? '💪' : '🎯'}
          </div>
        </div>
        <div className="w-full bg-[#0F1419] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#4F7FFF] h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-[#6B7280] mt-2">
          {completedCount} de {totalCount} hábitos completados
        </p>
      </Card>

      {/* Checklist */}
      <h2 className="text-lg font-semibold text-white mb-4">Hábitos Diários</h2>
      <div className="space-y-2">
        {HABITS_LIST.map((habit) => {
          const checked = !!habitsStatus[habit.id];
          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                checked ? 'bg-[#4F7FFF]/10 border border-[#4F7FFF]/30' : 'bg-[#1A1F29] border border-[#2A2F3A] hover:bg-[#242933]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked ? 'bg-[#4F7FFF]' : 'border-2 border-[#2A2F3A]'
                }`}
              >
                {checked && <IconCheck />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${checked ? 'text-white' : 'text-white'}`}>
                  {habit.label}
                </p>
                <p className="text-xs text-[#6B7280]">{habit.desc}</p>
              </div>
              <div className="text-xl">{habit.icon}</div>
            </div>
          );
        })}
      </div>

      {/* Success Message */}
      {progress === 100 && (
        <Card className="mt-6 bg-[#22C55E]/10 border-[#22C55E]/30">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-sm font-medium text-white">Parabéns! Dia perfeito completado!</p>
          </div>
        </Card>
      )}
    </div>
  );
};
