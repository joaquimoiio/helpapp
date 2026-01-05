import React, { useState } from 'react';
import { FOODS_DATA, SUPPLEMENTS_DATA, MEALS_DATA } from '../data/nutrition';
import { Card, Button, Badge } from '../components/base';
import { IconChevronDown } from '../components/base/Icons';

const FoodCard = ({ food }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center gap-3">
        <div className="text-3xl">{food.icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-white text-sm">{food.name}</h3>
            <Badge variant="success">{food.cat}</Badge>
          </div>
          {!expanded && <p className="text-xs text-[#6B7280] line-clamp-1">{food.science}</p>}
        </div>
        <div className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
          <IconChevronDown />
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#2A2F3A] space-y-2 text-sm">
          <p className="text-[#A1A8B3]"><span className="text-white font-medium">Ciência:</span> {food.science}</p>
          <p className="text-[#A1A8B3]"><span className="text-white font-medium">Como usar:</span> {food.how}</p>
          <p className="text-[#A1A8B3]"><span className="text-white font-medium">Nutrientes:</span> {food.nutrients}</p>
        </div>
      )}
    </Card>
  );
};

const SupplementCard = ({ sup }) => (
  <Card className="mb-3">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-semibold text-white">{sup.name}</h3>
      <Badge variant="secondary">{sup.dose}</Badge>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="bg-[#0F1419] p-2 rounded-lg">
        <p className="text-[10px] text-[#6B7280] mb-1">Horário</p>
        <p className="text-xs text-white font-medium">{sup.time}</p>
      </div>
      <div className="bg-[#0F1419] p-2 rounded-lg">
        <p className="text-[10px] text-[#6B7280] mb-1">Função</p>
        <p className="text-xs text-white font-medium">{sup.benefit}</p>
      </div>
    </div>
    <div className="bg-[#FACC15]/10 border border-[#FACC15]/30 p-2 rounded-lg">
      <p className="text-xs text-[#A1A8B3]">⚠️ {sup.warn}</p>
    </div>
  </Card>
);

export const NutritionView = () => {
  const [tab, setTab] = useState('foods');

  return (
    <div className="pb-24 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Nutrição</h1>
        <p className="text-sm text-[#A1A8B3]">Alimente seu corpo corretamente</p>
      </div>

      <div className="flex gap-2 mb-6 bg-[#1A1F29] p-1 rounded-lg">
        {['foods', 'supplements', 'meals'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-colors ${
              tab === t ? 'bg-[#4F7FFF] text-white' : 'text-[#6B7280] hover:text-white'
            }`}
          >
            {t === 'foods' ? 'Alimentos' : t === 'supplements' ? 'Suplementos' : 'Refeições'}
          </button>
        ))}
      </div>

      {tab === 'foods' && (
        <div>
          {FOODS_DATA.map((food, i) => <FoodCard key={i} food={food} />)}
        </div>
      )}

      {tab === 'supplements' && (
        <div>
          <Card className="mb-4 bg-[#FACC15]/10 border-[#FACC15]/30">
            <p className="text-sm text-white">⚠️ Consulte um médico antes de suplementar</p>
          </Card>
          {SUPPLEMENTS_DATA.map((sup, i) => <SupplementCard key={i} sup={sup} />)}
        </div>
      )}

      {tab === 'meals' && (
        <div>
          {Object.entries(MEALS_DATA).map(([title, options], i) => (
            <Card key={i} className="mb-4">
              <h3 className="font-semibold text-white mb-3">{title}</h3>
              <ul className="space-y-2">
                {options.map((meal, j) => (
                  <li key={j} className="flex gap-2 text-sm text-[#A1A8B3]">
                    <span className="text-[#4F7FFF]">•</span>
                    {meal}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
