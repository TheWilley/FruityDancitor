/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      background: {
        light: '#f1f5f8',
        dark: '#121212',
      },
    },
  },
  plugins: [daisyui],
};
