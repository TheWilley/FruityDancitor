/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      background: {
        light: '#f1f5f8',
        dark: '#121212',
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        light: '#1f2937',
        dark: '#1c1c1c',
      },
      gray: {
        light: '#374151',
        dark: '#686871',
      },
      white: {
        light: '#ffffff',
        dark: '#F5F5F5',
      },
      blue: {
        light: '#3b82f6',
        dark: '#0F65BD',
      }
    },
  },
  plugins: [],
};

