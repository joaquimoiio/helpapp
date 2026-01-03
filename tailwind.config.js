/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        card: '#1a1a24',
        primary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        text: {
          main: '#ffffff',
          muted: '#a1a1aa',
          dim: '#71717a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
