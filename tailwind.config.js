/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Baskerville"', 'serif'],
        didact: ['"Didact Gothic"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        montserratAlt: ['"Montserrat Alternates"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
}