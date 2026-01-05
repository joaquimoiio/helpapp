import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card } from '../components/base';
import { IconSend } from '../components/base/Icons';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ChatView = () => {
  const [messages, setMessages] = useState([{
    role: 'model',
    text: 'Olá! Sou o Vitalis AI. Posso ajudar com dúvidas sobre treino, nutrição e hábitos saudáveis.'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('vitalis_gemini_key', '');
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const callGemini = async (message, key) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
            systemInstruction: {
              parts: [{ text: "Você é Vitalis AI, assistente de saúde masculina. Responda em português, seja científico mas acessível, dê conselhos práticos sobre nutrição, exercícios, suplementos e hábitos para melhorar performance e saúde hormonal. Não recomende medicamentos. Sugira médico para problemas persistentes." }]
            }
          })
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      return `Erro: ${error.message}. Verifique sua API Key.`;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const messageToSend = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    const responseText = await callGemini(messageToSend, apiKey);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="p-4 bg-[#1A1F29] border-b border-[#2A2F3A]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-white">Vitalis AI</h2>
            <p className="text-xs text-[#6B7280]">Chat de saúde</p>
          </div>
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs text-[#4F7FFF]"
          >
            {apiKey ? '⚙️' : 'Configurar'}
          </button>
        </div>
      </div>

      {/* Key Input */}
      {showKeyInput && (
        <div className="p-4 bg-[#1A1F29] border-b border-[#2A2F3A]">
          <label className="block text-xs text-[#A1A8B3] mb-2">API Key do Gemini</label>
          <p className="text-xs text-[#6B7280] mb-2">
            Obtenha em <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[#4F7FFF]">Google AI Studio</a>
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua chave aqui"
            className="w-full bg-[#0F1419] border border-[#2A2F3A] rounded-lg px-3 py-2 text-sm text-white mb-2"
          />
          <Button variant="primary" fullWidth onClick={() => setShowKeyInput(false)}>
            Salvar
          </Button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
              msg.role === 'user'
                ? 'bg-[#4F7FFF] text-white'
                : 'bg-[#1A1F29] border border-[#2A2F3A] text-[#A1A8B3]'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1A1F29] border border-[#2A2F3A] px-4 py-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#4F7FFF] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#4F7FFF] animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 rounded-full bg-[#4F7FFF] animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#1A1F29] border-t border-[#2A2F3A]">
        {!apiKey ? (
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-2">Configure a API Key acima</p>
            <Button variant="primary" onClick={() => setShowKeyInput(true)}>
              Configurar
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua pergunta..."
              className="flex-1 bg-[#0F1419] border border-[#2A2F3A] rounded-lg px-3 py-2 text-sm text-white"
            />
            <Button
              variant="primary"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              Enviar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
