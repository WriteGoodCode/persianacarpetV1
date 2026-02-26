/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#C4703F',
        sand: '#F5EDE4',
        espresso: '#2C1810',
        sage: '#7A8B6E',
        'sand-dark': '#EDE2D4',
      },
      fontFamily: {
        heading: ['"Libre Baskerville"', 'serif'],
        body: ['"Source Sans Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
