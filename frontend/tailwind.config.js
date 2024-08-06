/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          200: '$F6F6FB',
          300: '#F1F2F7',
        },
        primary: {
          100: '#707FDD',
          200: '#5A6ACF',
          250: '#5A67BA',
        },
        secondary: {
          100: '#E6E8EC',
          200: '#A6ABC8',
          300: '#082431',
          350: '#1F384C',
        },
      },
    },
  },
  plugins: [],
};
