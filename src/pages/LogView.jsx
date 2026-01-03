import { useState } from 'react';
import { IconStar } from '../components/icons';
import { WeeklyChart } from '../components/ui/WeeklyChart';

export const LogView = ({ logs, setLogs }) => {
  const todayKey = new Date().toISOString().split('T')[0];
  const [todayRating, setTodayRating] = useState(logs[todayKey]?.rating || 0);

  const handleRate = (rating) => {
    setTodayRating(rating);
    setLogs(prev => ({
      ...prev,
      [todayKey]: { ...prev[todayKey], rating }
    }));
  };

  return (
    <div className="pb-24 pt-4 px-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-6">Diário de Performance</h1>

      <div className="bg-card rounded-2xl p-6 mb-6 border border-white/5 text-center">
        <h2 className="text-lg text-text-muted mb-4">Como foi seu desempenho hoje?</h2>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className={`p-2 rounded-full transition-transform active:scale-110 ${star <= todayRating ? 'text-warning' : 'text-white/10'}`}
            >
              <IconStar fill={star <= todayRating} />
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-white">
          {todayRating === 0 ? "Avalie seu dia" :
            todayRating < 3 ? "Dia difícil, amanhã será melhor." :
              todayRating < 5 ? "Bom trabalho!" : "Performance Máxima! 🔥"}
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-white/5 flex-1">
        <h3 className="text-md font-bold text-white mb-2">Histórico (7 dias)</h3>
        <WeeklyChart logs={logs} />
      </div>
    </div>
  );
};
