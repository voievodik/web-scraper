/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        n: {
          1: "#6C48C5",
          2: "#FFF4EA",
          3: "#FFF4EA",
          4: "#808D7C",
        },
      },
    },
  },
  plugins: [],
};
