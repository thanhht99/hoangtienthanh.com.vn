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
        brand: {
          50: '#fdf6ee',
          100: '#faecd6',
          200: '#f4d5ad',
          300: '#ebb879',
          400: '#e19747',
          500: '#d97b26',
          600: '#c45f1d',
          700: '#a3471b',
          800: '#83391d',
          900: '#6c301c',
          950: '#3c160c',
        },
        terracotta: {
          400: '#e06d53',
          500: '#cf5034',
          600: '#b83b22',
          700: '#982d1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
