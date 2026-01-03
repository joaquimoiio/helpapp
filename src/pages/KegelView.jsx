import { useState, useEffect } from 'react';
import { IconPlay, IconPause, IconRefresh } from '../components/icons';

export const KegelView = () => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('idle'); // idle, contract, relax
  const [timer, setTimer] = useState(5);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const totalReps = 10;
  const totalSets = 3;

  useEffect(() => {
    let interval = null;
    if (isActive && sets < totalSets) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Switch mode
            if (mode === 'contract') {
              setMode('relax');
              return 5;
            } else if (mode === 'relax') {
              if (reps + 1 >= totalReps) {
                // Set finished
                setSets(s => s + 1);
                setReps(0);
                setMode('idle');
                setIsActive(false);
                return 5;
              }
              setReps(r => r + 1);
              setMode('contract');
              return 5;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, mode, reps, sets]);

  const start = () => {
    if (sets >= totalSets) {
      setSets(0);
      setReps(0);
    }
    setIsActive(true);
    if (mode === 'idle') setMode('contract');
  };

  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setMode('idle');
    setTimer(5);
    setReps(0);
    setSets(0);
  };

  const getCircleColor = () => {
    if (mode === 'contract') return 'text-primary';
    if (mode === 'relax') return 'text-success';
    return 'text-card';
  };

  return (
    <div className="pb-24 pt-4 px-4 h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-white absolute top-6 left-6">Kegel Trainer</h1>

      <div className="text-center mb-8">
        <p className="text-text-muted text-lg mb-1">{mode === 'idle' ? 'Pronto para começar?' : mode === 'contract' ? 'CONTRAIA' : 'RELAXE'}</p>
        <h2 className={`text-6xl font-bold transition-colors duration-300 ${mode === 'contract' ? 'text-primary' : mode === 'relax' ? 'text-success' : 'text-white'}`}>
          {mode === 'idle' ? 'Start' : timer}
        </h2>
      </div>

      {/* Visualizer */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-10">
        <div className={`absolute w-full h-full rounded-full border-4 border-card opacity-30`}></div>
        <div
          className={`w-full h-full rounded-full border-4 border-current transition-all duration-1000 ease-in-out flex items-center justify-center ${getCircleColor()} ${mode === 'contract' ? 'scale-100 opacity-100' : mode === 'relax' ? 'scale-75 opacity-50' : 'scale-90 opacity-20'}`}
        >
          {mode === 'contract' && <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{reps}/{totalReps}</span>
          <p className="text-xs text-text-muted uppercase">Reps</p>
        </div>
        <div className="w-px bg-white/10"></div>
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{sets}/{totalSets}</span>
          <p className="text-xs text-text-muted uppercase">Séries</p>
        </div>
      </div>

      <div className="flex gap-4">
        {!isActive ? (
          <button onClick={start} className="bg-primary hover:bg-primary/80 text-white rounded-full p-6 shadow-lg shadow-primary/30 transition-all active:scale-95">
            <IconPlay />
          </button>
        ) : (
          <button onClick={pause} className="bg-card hover:bg-white/10 text-white border border-white/10 rounded-full p-6 transition-all active:scale-95">
            <IconPause />
          </button>
        )}
        <button onClick={reset} className="bg-card hover:bg-white/10 text-text-muted border border-white/10 rounded-full p-6 transition-all active:scale-95">
          <IconRefresh />
        </button>
      </div>
    </div>
  );
};
