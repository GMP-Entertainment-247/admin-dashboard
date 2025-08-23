/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BFA100",
        grey: {
          1: "#E6E6E6",
        },
        black: {
          1: "#1A1A1A",
        }
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        league_spartan: ["League Spartan", 'sans-serif']
      },
    },
  },
  plugins: [],
}

