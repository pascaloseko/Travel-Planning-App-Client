/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  purge: ['./.next/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
          bounce200: 'bounce 1s infinite 200ms',
          bounce400: 'bounce 1s infinite 400ms',
      },
      cursor: {
        pointer: 'pointer',
      },
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
  },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['disabled', 'active'],
      boxShadow: ['active'],
      cursor: ['hover', 'focus'],
    },
  },
};
