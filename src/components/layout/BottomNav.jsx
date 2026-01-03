import {
  IconHome,
  IconDumbbell,
  IconClock,
  IconApple,
  IconBarChart,
  IconMessageCircle
} from '../icons';

export const BottomNav = ({ activeTab, setTab }) => {
  const tabs = [
    { id: 'home', icon: <IconHome />, label: 'Início' },
    { id: 'workout', icon: <IconDumbbell />, label: 'Treino' },
    { id: 'kegel', icon: <IconClock />, label: 'Kegel' },
    { id: 'nutrition', icon: <IconApple />, label: 'Nutri' },
    { id: 'log', icon: <IconBarChart />, label: 'Log' },
    { id: 'chat', icon: <IconMessageCircle />, label: 'IA' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#1a1a24]/95 backdrop-blur-md border-t border-white/5 pb-safe pt-2 px-2 z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-text-dim hover:text-text-muted'}`}
          >
            <div className={`${activeTab === tab.id ? 'translate-y-[-2px]' : ''} transition-transform`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
