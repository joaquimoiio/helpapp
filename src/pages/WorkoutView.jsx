import { useState } from 'react';
import { EXERCISES_DATA } from '../data/exercises';
import { Accordion } from '../components/ui/Accordion';

export const WorkoutView = () => {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="pb-24 pt-4 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Protocolo de Treino</h1>
      {EXERCISES_DATA.map((section, idx) => (
        <Accordion
          key={idx}
          title={section.category}
          count={section.items.length}
          isOpen={openSection === idx}
          onToggle={() => setOpenSection(openSection === idx ? null : idx)}
        >
          <ul className="space-y-3 py-2">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-text-muted border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="min-w-[6px] h-[6px] rounded-full bg-secondary"></div>
                {item}
              </li>
            ))}
          </ul>
        </Accordion>
      ))}
    </div>
  );
};
