/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#07080d',
        'bg-2': '#0e1018',
        'bg-3': '#161921',
        card: '#13151e',
        a1: '#00e5ff',
        a2: '#7c3aed',
        a3: '#10b981',
        a4: '#f59e0b',
        a5: '#ef4444',
        t1: '#f0f2ff',
        t2: '#8892b0',
        t3: '#4a5568',
        border: '#1a1d2e',
      }
    },
  },
  plugins: [],
}
