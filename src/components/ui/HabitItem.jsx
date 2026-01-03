import { IconCheck } from '../icons';

export const HabitItem = ({ habit, checked, onToggle }) => (
  <div
    onClick={onToggle}
    className={`flex items-center justify-between p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${checked ? 'bg-primary/20 border-primary/50' : 'bg-card hover:bg-[#252533]'}`}
  >
    <div className="flex items-center gap-4">
      <div className="text-2xl">{habit.icon}</div>
      <div>
        <h3 className={`font-semibold ${checked ? 'text-primary' : 'text-text-main'}`}>{habit.label}</h3>
        <p className="text-xs text-text-muted">{habit.desc}</p>
      </div>
    </div>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${checked ? 'bg-primary border-primary' : 'border-text-dim'}`}>
      {checked && <div className="text-white"><IconCheck /></div>}
    </div>
  </div>
);
