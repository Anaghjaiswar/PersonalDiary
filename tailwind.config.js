/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1F1F1F',
        'secondary': '#D8D8D8',
        'drag': '#C38FFF',
        'options': '#03DAC6'
      }
    },
  },
  plugins: [],
}
