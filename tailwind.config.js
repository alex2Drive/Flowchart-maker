/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agent-primary': '#6366f1',
        'agent-secondary': '#8b5cf6',
        'agent-success': '#10b981',
        'agent-warning': '#f59e0b',
        'agent-danger': '#ef4444',
      }
    },
  },
  plugins: [],
}
