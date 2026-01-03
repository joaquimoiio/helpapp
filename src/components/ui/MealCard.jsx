export const MealCard = ({ title, options }) => (
  <div className="bg-card rounded-xl p-4 mb-4 border border-white/5">
    <h3 className="text-lg font-bold text-text-main mb-3 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-success"></span> {title}
    </h3>
    <ul className="space-y-2">
      {options.map((opt, idx) => (
        <li key={idx} className="text-sm text-text-muted flex items-start gap-2">
          <span className="text-primary mt-1">•</span> {opt}
        </li>
      ))}
    </ul>
  </div>
);
