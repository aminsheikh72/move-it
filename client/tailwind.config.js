/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'custom-lg': '0 10px 25px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};