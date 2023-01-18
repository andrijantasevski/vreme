/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101039",
        "primary-light": "#1D1D48",
        contrast: "#ECA914",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
