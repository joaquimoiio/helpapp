import { useState, useEffect, useRef } from 'react';
import { IconSend } from '../components/icons';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ChatView = () => {
  const [messages, setMessages] = useState([{ role: 'model', text: 'Olá! Sou o Vitalis AI. Pergunte sobre treinos, nutrição ou hábitos.' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('vitalis_gemini_key', '');
  const messagesEndRef = useRef(null);
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await callGemini(userMsg, apiKey);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const formatText = (text) => {
    // Simple formatting for bold and bullets
    return text.split('\n').map((line, i) => {
      if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.substring(2)}</li>;
      if (line.startsWith('**')) return <strong key={i} className="block mt-2">{line.replace(/\*\*/g, '')}</strong>;
      return <p key={i} className="mb-1">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-card flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs">AI</div>
          <h2 className="font-bold">Vitalis Chat</h2>
        </div>
        <button onClick={() => setShowKeyInput(!showKeyInput)} className="text-xs text-primary underline">
          {apiKey ? 'Alterar Key' : 'Configurar Key'}
        </button>
      </div>

      {/* Key Input */}
      {showKeyInput && (
        <div className="p-4 bg-card border-b border-white/5">
          <label className="block text-xs text-text-muted mb-2">Gemini API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua API Key aqui..."
            className="w-full bg-background border border-white/10 rounded-lg p-3 text-sm text-white focus:border-primary outline-none"
          />
          <button
            onClick={() => setShowKeyInput(false)}
            className="mt-2 w-full bg-primary/20 text-primary py-2 rounded-lg text-xs font-bold"
          >
            Salvar & Fechar
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-card text-text-muted rounded-tl-none border border-white/5'
              }`}>
              {formatText(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
              <div className="w-2 h-2 bg-text-dim rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-text-dim rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-text-dim rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre sua saúde..."
            className="flex-1 bg-background border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:border-primary outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input || !apiKey}
            className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconSend />
          </button>
        </div>
      </div>
    </div>
  );
};
