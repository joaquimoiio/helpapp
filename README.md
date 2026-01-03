# Vitalis - Saúde Masculina

Aplicativo web para monitoramento de hábitos saudáveis, treinos, nutrição e performance masculina.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Gemini AI** - Integração com IA para assistência personalizada

## 📁 Estrutura do Projeto

```
helpapp/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/
│   │   ├── icons/             # Componentes de ícones SVG
│   │   │   └── index.jsx
│   │   ├── layout/            # Componentes de layout
│   │   │   └── BottomNav.jsx
│   │   └── ui/                # Componentes reutilizáveis de UI
│   │       ├── Accordion.jsx
│   │       ├── FoodCard.jsx
│   │       ├── HabitItem.jsx
│   │       ├── MealCard.jsx
│   │       ├── ProgressRing.jsx
│   │       ├── SupplementCard.jsx
│   │       └── WeeklyChart.jsx
│   ├── data/
│   │   ├── exercises.js       # Dados de exercícios
│   │   ├── habits.js          # Lista de hábitos
│   │   └── nutrition.js       # Dados nutricionais
│   ├── hooks/
│   │   └── useLocalStorage.js # Hook customizado para localStorage
│   ├── pages/
│   │   ├── ChatView.jsx       # Página de chat com IA
│   │   ├── HomeView.jsx       # Página inicial
│   │   ├── KegelView.jsx      # Treinador de Kegel
│   │   ├── LogView.jsx        # Diário de performance
│   │   ├── NutritionView.jsx  # Nutrição e suplementos
│   │   └── WorkoutView.jsx    # Protocolos de treino
│   ├── App.jsx                # Componente principal
│   ├── index.css              # Estilos globais
│   └── main.jsx               # Ponto de entrada
├── index-new.html             # HTML principal (Vite)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000
```

## 📦 Build para Produção

```bash
npm run build
```

O build estará disponível na pasta `dist/`.

## ⚙️ Funcionalidades

- ✅ **Checklist Diário** - Acompanhe 10 hábitos essenciais
- 🏋️ **Protocolo de Treino** - Exercícios organizados por categoria
- 💪 **Kegel Trainer** - Timer interativo para exercícios de Kegel
- 🥗 **Nutrição** - Alimentos, suplementos e ideias de refeições
- 📊 **Diário de Performance** - Avaliação diária e histórico
- 🤖 **Chat com IA** - Assistente virtual para dúvidas de saúde

## 🔑 Configuração da API Gemini

Para usar o chat com IA:

1. Obtenha uma API Key em: https://makersuite.google.com/app/apikey
2. No app, acesse a aba "IA"
3. Clique em "Configurar Key"
4. Cole sua API Key

## 📱 PWA

Este aplicativo é um Progressive Web App (PWA) e pode ser instalado em dispositivos móveis.

## 📄 Licença

Projeto de uso pessoal.
