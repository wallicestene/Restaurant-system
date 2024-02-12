/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
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
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      flex: {
        8: 0.8,
        2: 0.2,
      },
      backgroundImage: {
        login: "url('./src/assets/loginFormImages/restaurant1.png')",
        signup: "url('./src/assets/loginFormImages/restaurant2.png')",
      },
      fontSize: {
        sm: "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
        base: "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
        lg: "clamp(1.2rem, 0.61vw + 0.97rem, 1.3rem)",
        xl: "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
        "2xl": "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
        "3xl": "clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
        "4xl": "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
        "5xl": "clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)",
        "6xl": "clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)",
      },
    },
  },
  plugins: [require("tailwind-clip-path")],
};
