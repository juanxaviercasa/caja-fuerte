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
        vault: {
          950: 'var(--vault-950)',
          900: 'var(--vault-900)',
          850: 'var(--vault-850)',
          800: 'var(--vault-800)',
          750: 'var(--vault-750)',
          700: 'var(--vault-700)',
          600: 'var(--vault-600)',
          500: 'var(--vault-500)',
          accent: 'var(--vault-accent)', 
          cyan: 'var(--vault-cyan)',
          indigo: 'var(--vault-indigo)',
          gold: 'var(--vault-gold)',
          danger: 'var(--vault-danger)'
        },
        slate: {
          50: 'var(--slate-50)',
          100: 'var(--slate-100)',
          200: 'var(--slate-200)',
          300: 'var(--slate-300)',
          400: 'var(--slate-400)',
          500: 'var(--slate-500)',
          600: 'var(--slate-600)',
          700: 'var(--slate-700)',
          800: 'var(--slate-800)',
          900: 'var(--slate-900)',
          950: 'var(--slate-950)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.2), 0 0 15px rgba(16, 185, 129, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2)' },
        }
      }
    },
  },
  plugins: [],
}
