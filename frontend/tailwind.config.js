/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        "1vmax": "1vmax",
      },
    },
  },
  plugins: [require("daisyui")],
};
