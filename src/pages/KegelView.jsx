import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/base';
import { IconPlay, IconPause, IconRefresh } from '../components/base/Icons';

export const KegelView = () => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('idle');
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
            if (mode === 'contract') {
              setMode('relax');
              return 5;
            } else if (mode === 'relax') {
              if (reps + 1 >= totalReps) {
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

  return (
    <div className="pb-24 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Kegel Trainer</h1>
        <p className="text-sm text-[#A1A8B3]">Exercício para assoalho pélvico</p>
      </div>

      {/* Explicação */}
      <Card className="mb-6 bg-[#4F7FFF]/10 border-[#4F7FFF]/30">
        <h3 className="font-semibold text-white mb-2">🎯 O que é Kegel?</h3>
        <p className="text-sm text-[#A1A8B3] mb-3">
          Exercício de Kegel fortalece os músculos do assoalho pélvico, melhorando controle urinário,
          circulação sanguínea na região e função sexual.
        </p>
        <div className="bg-[#0F1419] rounded-lg p-3">
          <p className="text-xs font-semibold text-white mb-2">📍 Como identificar o músculo:</p>
          <p className="text-xs text-[#A1A8B3]">
            Aperte como se estivesse segurando o xixi no meio do fluxo. É esse o músculo que você vai trabalhar!
            Não aperte barriga, nádegas ou coxas - apenas o músculo interno.
          </p>
        </div>
      </Card>

      {/* Timer */}
      <Card className="mb-6 text-center">
        <p className="text-sm text-[#A1A8B3] mb-2">
          {mode === 'idle' ? 'Pressione play' : mode === 'contract' ? 'CONTRAIA' : 'RELAXE'}
        </p>
        <div className={`text-7xl font-bold mb-2 ${
          mode === 'contract' ? 'text-[#4F7FFF]' : mode === 'relax' ? 'text-[#22C55E]' : 'text-white'
        }`}>
          {mode === 'idle' ? '—' : timer}
        </div>
        {mode !== 'idle' && (
          <p className="text-xs text-[#6B7280]">
            {mode === 'contract' ? 'Aperte como se segurasse o xixi' : 'Solte completamente'}
          </p>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card>
          <p className="text-xs text-[#6B7280] mb-1">Repetições</p>
          <p className="text-2xl font-bold text-white">{reps}/{totalReps}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280] mb-1">Séries</p>
          <p className="text-2xl font-bold text-white">{sets}/{totalSets}</p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        {!isActive ? (
          <Button variant="primary" fullWidth onClick={start}>
            Iniciar
          </Button>
        ) : (
          <Button variant="secondary" fullWidth onClick={pause}>
            Pausar
          </Button>
        )}
        <Button variant="ghost" onClick={reset}>
          Resetar
        </Button>
      </div>

      {/* Completion */}
      {sets >= totalSets && (
        <Card className="bg-[#22C55E]/10 border-[#22C55E]/30 text-center mb-6">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-sm font-medium text-white">Treino completo! Parabéns!</p>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <h3 className="font-semibold text-white mb-3">💡 Dicas</h3>
        <ul className="space-y-2 text-sm text-[#A1A8B3]">
          <li>• Pode fazer deitado, sentado ou em pé</li>
          <li>• Respire normalmente durante o exercício</li>
          <li>• Não aperte barriga, nádegas ou coxas</li>
          <li>• Faça 3 séries por dia para melhores resultados</li>
          <li>• Resultados aparecem em 4-6 semanas</li>
        </ul>
      </Card>
    </div>
  );
};
