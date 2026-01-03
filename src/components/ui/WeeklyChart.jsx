export const WeeklyChart = ({ logs }) => {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date().getDay();

  // Generate last 7 days data from logs object
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    return logs[key]?.rating || 0;
  });

  return (
    <div className="flex justify-between items-end h-32 w-full pt-4">
      {last7Days.map((val, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2 w-full">
          <div className="w-full flex justify-center items-end h-20">
            <div
              style={{ height: `${(val / 5) * 100}%` }}
              className={`w-2 md:w-4 rounded-t-sm transition-all duration-500 ${idx === 6 ? 'bg-primary' : 'bg-text-dim/30'}`}
            ></div>
          </div>
          <span className={`text-xs ${idx === 6 ? 'text-primary font-bold' : 'text-text-dim'}`}>
            {days[(today - (6 - idx) + 7) % 7]}
          </span>
        </div>
      ))}
    </div>
  );
};
