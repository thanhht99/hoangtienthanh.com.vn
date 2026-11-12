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
          50: '#eefbfd',
          100: '#d4f4f9',
          200: '#aee9f4',
          300: '#76d8ec',
          400: '#37bedc',
          500: '#1ba2c2',
          600: '#1882a3',
          700: '#1a6985',
          800: '#1d566d',
          900: '#1c485c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
