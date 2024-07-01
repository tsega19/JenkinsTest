/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"], // Add your font stack here
      },
      backgroundColor: {
        primary: "#F58634", // Corrected primary color definition
        secondary: "#3E4095", // Corrected secondary color definition
      },
      textColor: {
        primary: "#F58634", // Corrected primary color definition
        secondary: "#3E4095", // Corrected secondary color definition
      },
      borderColor: {
        primary: "#F58634", // Corrected primary color definition
        secondary: "#3E4095", // Corrected secondary color definition
      },
    },
  },
  plugins: [require("daisyui")],
};
