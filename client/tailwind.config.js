/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "totem-pole": {
          50: "#fff8eb",
          100: "#fff0d1",
          200: "#ffdca1",
          300: "#ffc165",
          400: "#ff9928",
          500: "#ff7a00",
          600: "#ff5c00",
          700: "#d54200",
          800: "#a83404",
          900: "#8d2f07",
          950: "#491301",
        },
      },
    },
  },
  plugins: [],
};
