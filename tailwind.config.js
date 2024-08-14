/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { opacity: "0" },
          "50%": { opacity: "50" },
          "100%": { opacity: "100" },
        },
      },
      animation: {
        appear: "appear .7s ease-in",
      },
    },
  },
  plugins: [],
};
