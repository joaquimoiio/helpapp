import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '../icons';

export const FoodCard = ({ food }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl mb-3 overflow-hidden border border-white/5">
      <div className="p-4 flex items-center gap-4" onClick={() => setExpanded(!expanded)}>
        <div className="text-3xl">{food.icon}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-bold text-text-main">{food.name}</h3>
            <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">{food.cat}</span>
          </div>
          <p className="text-xs text-text-muted mt-1 truncate">{food.science}</p>
        </div>
        {expanded ? <IconChevronUp /> : <IconChevronDown />}
      </div>
      {expanded && (
        <div className="px-4 pb-4 text-sm text-text-muted bg-[#15151e]">
          <p className="mb-2"><strong className="text-primary">Ciência:</strong> {food.science}</p>
          <p className="mb-2"><strong className="text-success">Como consumir:</strong> {food.how}</p>
          <p><strong className="text-warning">Nutrientes:</strong> {food.nutrients}</p>
        </div>
      )}
    </div>
  );
};
