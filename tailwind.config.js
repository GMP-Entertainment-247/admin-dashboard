/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BFA100",
        grey: {
          1: "#E6E6E6",
          normal: "#212121",
        },
        black: {
          default: "#000000",
          1: "#1A1A1A",
        },
        gold: {
          35: "#B08A03",
        },
        brand: {
          25: "#F6F1D5",
          500: "#BFA100",
        },
        red: {
          normal: "#FF0000",
          light: "#FFE5E5",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        league_spartan: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
