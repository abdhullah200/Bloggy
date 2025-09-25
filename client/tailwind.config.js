/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B838FF', // Purple button color
        },
        // Dark theme colors only
        dark: {
          primary: '#B838FF',     // Purple
          background: '#141414',  // Night
          surface: '#8A6552',     // Raw umber  
          text: '#E3DBDB',        // Timberwolf
          secondary: '#FBC4AB',   // Apricot
        },
        // Custom purple shades
        purple: {
          500: '#B838FF',
          600: '#9D2EE6',
          700: '#8224CC',
        }
      }
    },
  },
  plugins: [],
}