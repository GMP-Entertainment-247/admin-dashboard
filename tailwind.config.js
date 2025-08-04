/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BFA100",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        league_spartan: ["League Spartan", 'sans-serif']
      }
    },
  },
  plugins: [],
}

