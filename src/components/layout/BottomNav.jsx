import React from 'react';
import { IconHome, IconDumbbell, IconActivity, IconWind, IconApple, IconMessageCircle } from '../base/Icons';

export const BottomNav = ({ activeTab, setTab }) => {
  const tabs = [
    { id: 'home', icon: <IconHome />, label: 'Início' },
    { id: 'workout', icon: <IconDumbbell />, label: 'Treino' },
    { id: 'kegel', icon: <IconActivity />, label: 'Kegel' },
    { id: 'breathing', icon: <IconWind />, label: 'Controle' },
    { id: 'nutrition', icon: <IconApple />, label: 'Nutrição' },
    { id: 'chat', icon: <IconMessageCircle />, label: 'IA' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-[#1A1F29] border-t border-[#2A2F3A]">
        <div className="flex justify-around h-16 px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className="flex flex-col items-center justify-center flex-1 gap-1"
              >
                <div className={`transition-colors ${isActive ? 'text-[#4F7FFF]' : 'text-[#6B7280]'}`}>
                  {tab.icon}
                </div>
                <span className={`text-[9px] font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-[#6B7280]'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
