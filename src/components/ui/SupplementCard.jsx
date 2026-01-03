export const SupplementCard = ({ sup }) => (
  <div className="bg-card rounded-xl p-4 mb-3 border border-white/5 flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-primary text-lg">{sup.name}</h3>
      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white">{sup.dose}</span>
    </div>
    <div className="grid grid-cols-2 gap-2 text-xs mt-1">
      <div className="bg-black/20 p-2 rounded">
        <span className="block text-text-dim mb-1">Horário</span>
        <span className="text-white font-medium">{sup.time}</span>
      </div>
      <div className="bg-black/20 p-2 rounded">
        <span className="block text-text-dim mb-1">Função</span>
        <span className="text-white font-medium line-clamp-2">{sup.benefit}</span>
      </div>
    </div>
    <p className="text-xs text-warning mt-1 border-l-2 border-warning pl-2 italic">{sup.warn}</p>
  </div>
);
