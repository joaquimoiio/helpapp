import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/base';

export const BreathingView = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('breathe');
  const [timer, setTimer] = useState(4);
  const [cycle, setCycle] = useState(0);

  const exercises = [
    {
      id: 'box',
      name: 'Respiração Quadrada',
      icon: '🟦',
      benefit: 'Reduz ansiedade e nervosismo',
      description: 'Técnica usada por Navy SEALs para controle sob pressão',
      phases: [
        { name: 'Inspire', duration: 4, color: 'text-[#4F7FFF]' },
        { name: 'Segure', duration: 4, color: 'text-[#FACC15]' },
        { name: 'Expire', duration: 4, color: 'text-[#22C55E]' },
        { name: 'Segure', duration: 4, color: 'text-[#FACC15]' }
      ],
      totalCycles: 5
    },
    {
      id: '478',
      name: 'Respiração 4-7-8',
      icon: '😌',
      benefit: 'Acalma mente e controla excitação',
      description: 'Técnica do Dr. Andrew Weil para relaxamento profundo',
      phases: [
        { name: 'Inspire', duration: 4, color: 'text-[#4F7FFF]' },
        { name: 'Segure', duration: 7, color: 'text-[#FACC15]' },
        { name: 'Expire', duration: 8, color: 'text-[#22C55E]' }
      ],
      totalCycles: 4
    },
    {
      id: 'wim',
      name: 'Respiração Wim Hof',
      icon: '❄️',
      benefit: 'Aumenta energia e testosterona',
      description: '30 respirações profundas seguidas de retenção',
      phases: [
        { name: 'Respire fundo', duration: 2, color: 'text-[#4F7FFF]' },
        { name: 'Expire rápido', duration: 1, color: 'text-[#22C55E]' }
      ],
      totalCycles: 30
    }
  ];

  useEffect(() => {
    if (!isActive || !activeExercise) return;

    const exercise = exercises.find(e => e.id === activeExercise);
    const currentPhase = exercise.phases[phase % exercise.phases.length];

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          const nextPhaseIndex = (phase + 1) % exercise.phases.length;

          if (nextPhaseIndex === 0) {
            setCycle(c => c + 1);
            if (cycle + 1 >= exercise.totalCycles) {
              setIsActive(false);
              setPhase(0);
              setCycle(0);
              return 0;
            }
          }

          setPhase(nextPhaseIndex);
          return exercise.phases[nextPhaseIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, activeExercise, phase, cycle]);

  const startExercise = (exerciseId) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    setActiveExercise(exerciseId);
    setIsActive(true);
    setPhase(0);
    setCycle(0);
    setTimer(exercise.phases[0].duration);
  };

  const stopExercise = () => {
    setIsActive(false);
    setActiveExercise(null);
    setPhase(0);
    setCycle(0);
  };

  const getCurrentExercise = () => exercises.find(e => e.id === activeExercise);
  const getCurrentPhase = () => {
    const exercise = getCurrentExercise();
    return exercise?.phases[phase % exercise.phases.length];
  };

  return (
    <div className="pb-24 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Respiração & Controle</h1>
        <p className="text-sm text-[#A1A8B3]">Técnicas para controlar ansiedade e duração</p>
      </div>

      {/* Info Card */}
      <Card className="mb-6 bg-[#4F7FFF]/10 border-[#4F7FFF]/30">
        <h3 className="font-semibold text-white mb-2">🎯 Por que respirar?</h3>
        <p className="text-sm text-[#A1A8B3] mb-3">
          A respiração controlada reduz ansiedade de performance, controla excitação prematura e
          aumenta o tempo de duração durante a atividade sexual.
        </p>
        <div className="bg-[#0F1419] rounded-lg p-3">
          <p className="text-xs text-white">
            <span className="font-semibold">Dica:</span> Pratique 2x ao dia (manhã e antes de dormir) para melhores resultados.
          </p>
        </div>
      </Card>

      {/* Active Exercise */}
      {isActive && activeExercise && (
        <Card className="mb-6 text-center">
          <p className="text-sm text-[#A1A8B3] mb-2">
            Ciclo {cycle + 1}/{getCurrentExercise()?.totalCycles}
          </p>
          <div className={`text-6xl font-bold mb-3 ${getCurrentPhase()?.color}`}>
            {timer}
          </div>
          <p className="text-lg font-semibold text-white mb-4">
            {getCurrentPhase()?.name}
          </p>
          <Button variant="secondary" onClick={stopExercise}>
            Parar
          </Button>
        </Card>
      )}

      {/* Exercises List */}
      {!isActive && (
        <div className="space-y-3 mb-6">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="cursor-pointer hover:bg-[#242933]" onClick={() => startExercise(exercise.id)}>
              <div className="flex items-start gap-3">
                <div className="text-4xl">{exercise.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{exercise.name}</h3>
                  <p className="text-xs text-[#22C55E] mb-2">✓ {exercise.benefit}</p>
                  <p className="text-xs text-[#6B7280]">{exercise.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Técnicas de Controle */}
      <h2 className="text-lg font-semibold text-white mb-4">Técnicas de Controle Ejaculatório</h2>

      <Card className="mb-3">
        <h3 className="font-semibold text-white mb-2">🛑 Técnica Start-Stop</h3>
        <p className="text-sm text-[#A1A8B3] mb-3">
          Quando sentir que está próximo do clímax, pare completamente todos os movimentos
          e respire profundamente 3-5 vezes. Espere a sensação diminuir.
        </p>
        <div className="bg-[#0F1419] rounded-lg p-2">
          <p className="text-xs text-white">
            <span className="font-semibold">Benefício:</span> Aumenta o tempo em até 3x com prática regular
          </p>
        </div>
      </Card>

      <Card className="mb-3">
        <h3 className="font-semibold text-white mb-2">✋ Técnica Squeeze (Aperto)</h3>
        <p className="text-sm text-[#A1A8B3] mb-3">
          Quando sentir que vai ejacular, aperte firmemente a cabeça do pênis por 5-10 segundos.
          A vontade diminuirá.
        </p>
        <div className="bg-[#0F1419] rounded-lg p-2">
          <p className="text-xs text-white">
            <span className="font-semibold">Benefício:</span> Controle imediato da ejaculação
          </p>
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="font-semibold text-white mb-2">🧠 Técnica de Distração Mental</h3>
        <p className="text-sm text-[#A1A8B3] mb-3">
          Quando a excitação estiver muito alta, mude o foco mental. Pense em algo neutro
          (contar de 100 a 0, lembrar uma lista de compras).
        </p>
        <div className="bg-[#0F1419] rounded-lg p-2">
          <p className="text-xs text-white">
            <span className="font-semibold">Benefício:</span> Reduz ansiedade e controla excitação
          </p>
        </div>
      </Card>

      {/* Tips */}
      <Card>
        <h3 className="font-semibold text-white mb-3">💡 Dicas Gerais</h3>
        <ul className="space-y-2 text-sm text-[#A1A8B3]">
          <li>• Pratique as técnicas sozinho primeiro (autoconhecimento)</li>
          <li>• Combine respiração com Kegel para controle total</li>
          <li>• Evite cafeína e álcool antes da atividade</li>
          <li>• A prática leva à perfeição - não desista</li>
          <li>• Comunique-se com a parceira sobre seu progresso</li>
        </ul>
      </Card>
    </div>
  );
};
