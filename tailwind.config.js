/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
      colors: {
       darkPink:"#F0A8D0",
       lightPink: "#F7B5CA",
       peach: "#FFC6C6",
       yellow: "#FFEBD4"
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
