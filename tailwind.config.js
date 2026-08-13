/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#08080a',        // primary black background
        charcoal: '#151417',   // secondary dark surface
        charcoal2: '#1d1c20',  // elevated dark surface
        gold: {
          50: '#faf6ea',
          100: '#f2e8c9',
          200: '#e6d29a',
          300: '#d9bb6c',
          400: '#cba748',
          500: '#b3872e', // deep gold - primary
          600: '#9c7526',
          700: '#7a5a1d',
          DEFAULT: '#c8a35a',
          bright: '#e4c682',
        },
        bone: '#f8f6f1',       // light mode background
        ivory: '#fbfaf7',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(200,163,90,0.35)',
        goldlg: '0 20px 60px -20px rgba(200,163,90,0.35)',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
