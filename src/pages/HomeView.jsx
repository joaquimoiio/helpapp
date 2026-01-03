import { HABITS_LIST } from '../data/habits';
import { ProgressRing } from '../components/ui/ProgressRing';
import { HabitItem } from '../components/ui/HabitItem';

export const HomeView = ({ habitsStatus, toggleHabit, progress }) => (
  <div className="pb-24 pt-4 px-4">
    <header className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">Olá, Guerreiro</h1>
        <p className="text-text-muted text-sm">Foco na disciplina hoje.</p>
      </div>
      <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-white/10">
        <span className="text-xl">🦍</span>
      </div>
    </header>

    <div className="bg-card rounded-2xl p-6 mb-8 flex items-center justify-between border border-white/5 shadow-lg shadow-primary/5">
      <div>
        <span className="block text-text-muted text-sm mb-1">Progresso Diário</span>
        <h2 className="text-3xl font-bold text-white">{Math.round(progress)}%</h2>
        <p className="text-xs text-primary mt-1 font-medium">Mantenha o ritmo!</p>
      </div>
      <ProgressRing radius={45} stroke={6} progress={progress} color="#6366f1" />
    </div>

    <h3 className="text-lg font-bold text-white mb-4">Checklist Diário</h3>
    <div>
      {HABITS_LIST.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          checked={!!habitsStatus[habit.id]}
          onToggle={() => toggleHabit(habit.id)}
        />
      ))}
    </div>
  </div>
);
