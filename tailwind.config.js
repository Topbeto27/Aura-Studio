/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A14A',
        dark: '#181818',
        gray: {
          900: '#232323',
          700: '#444',
          400: '#bbb',
        },
      },
      fontFamily: {
        sans: ['Lato', 'Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'Lato', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
