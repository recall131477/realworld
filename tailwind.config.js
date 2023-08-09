/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro", sans-serif'],
      serif: ['"Source Serif Pro", sans-serif'],
      titillium: ['"Titillium Web", sans-serif'],
    },
    extend: {
      colors: {
        primary: '#5CB85C',
        'primary-dark': '#449D44',
        danger: '#B85C5C',
      },
    },
  },
  plugins: [],
};
