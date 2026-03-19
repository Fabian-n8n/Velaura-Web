/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#070612',
        foreground: '#ffffff',
        accent: '#F07030',          // orange — use sparingly (5%)
        'card-bg':  'rgba(255,255,255,0.03)',
        'card-border': 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        label: '0.22em',
      },
    },
  },
  plugins: [],
};
