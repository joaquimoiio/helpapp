import { useState } from 'react';
import { FOODS_DATA, SUPPLEMENTS_DATA, MEALS_DATA } from '../data/nutrition';
import { FoodCard } from '../components/ui/FoodCard';
import { SupplementCard } from '../components/ui/SupplementCard';
import { MealCard } from '../components/ui/MealCard';

export const NutritionView = () => {
  const [tab, setTab] = useState('foods'); // foods, supplements, meals

  return (
    <div className="pb-24 pt-4 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Nutrição & Suplementos</h1>

      <div className="flex p-1 bg-card rounded-xl mb-6 border border-white/5">
        {['foods', 'supplements', 'meals'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${tab === t ? 'bg-primary text-white shadow' : 'text-text-muted'}`}
          >
            {t === 'foods' ? 'Alimentos' : t === 'supplements' ? 'Suplementos' : 'Refeições'}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {tab === 'foods' && (
          <div>
            <p className="text-sm text-text-muted mb-4">Alimentos funcionais para circulação e hormônios.</p>
            {FOODS_DATA.map((food, i) => <FoodCard key={i} food={food} />)}
          </div>
        )}
        {tab === 'supplements' && (
          <div>
            <p className="text-sm text-text-muted mb-4">O essencial que funciona. Consulte médico.</p>
            {SUPPLEMENTS_DATA.map((sup, i) => <SupplementCard key={i} sup={sup} />)}
          </div>
        )}
        {tab === 'meals' && (
          <div>
            <p className="text-sm text-text-muted mb-4">Ideias de refeições anabólicas.</p>
            {Object.entries(MEALS_DATA).map(([key, options], i) => (
              <MealCard key={i} title={key} options={options} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
