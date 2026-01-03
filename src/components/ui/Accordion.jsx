import { IconChevronDown, IconChevronUp } from '../icons';

export const Accordion = ({ title, count, children, isOpen, onToggle }) => (
  <div className="mb-4 bg-card rounded-xl overflow-hidden border border-white/5">
    <button
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between bg-card active:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <div className="text-left">
          <h3 className="font-bold text-text-main">{title}</h3>
          <p className="text-xs text-text-muted">{count} exercícios</p>
        </div>
      </div>
      {isOpen ? <IconChevronUp /> : <IconChevronDown />}
    </button>
    {isOpen && (
      <div className="p-4 pt-0 border-t border-white/5">
        {children}
      </div>
    )}
  </div>
);
