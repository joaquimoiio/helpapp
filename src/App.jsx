import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { HABITS_LIST } from './data/habits';
import { HomeView } from './pages/HomeView';
import { WorkoutView } from './pages/WorkoutView';
import { KegelView } from './pages/KegelView';
import { NutritionView } from './pages/NutritionView';
import { LogView } from './pages/LogView';
import { ChatView } from './pages/ChatView';
import { BottomNav } from './components/layout/BottomNav';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Persisted State
  const [habitsLogs, setHabitsLogs] = useLocalStorage('vitalis_habits_logs', {});
  const [dailyRatings, setDailyRatings] = useLocalStorage('vitalis_ratings', {});

  const todayKey = new Date().toISOString().split('T')[0];
  const todayHabits = habitsLogs[todayKey] || {};

  const toggleHabit = (id) => {
    const newStatus = !todayHabits[id];
    setHabitsLogs(prev => ({
      ...prev,
      [todayKey]: {
        ...prev[todayKey],
        [id]: newStatus
      }
    }));
  };

  const calculateProgress = () => {
    const total = HABITS_LIST.length;
    const completed = Object.values(todayHabits).filter(Boolean).length;
    return (completed / total) * 100;
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/30 pb-4">
      {/* Render View based on Tab */}
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-background overflow-hidden">

        {activeTab === 'home' && (
          <HomeView
            habitsStatus={todayHabits}
            toggleHabit={toggleHabit}
            progress={calculateProgress()}
          />
        )}
        {activeTab === 'workout' && <WorkoutView />}
        {activeTab === 'kegel' && <KegelView />}
        {activeTab === 'nutrition' && <NutritionView />}
        {activeTab === 'log' && <LogView logs={dailyRatings} setLogs={setDailyRatings} />}
        {activeTab === 'chat' && <ChatView />}

        <BottomNav activeTab={activeTab} setTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
