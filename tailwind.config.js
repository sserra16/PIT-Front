/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login": "url('/src/assets/bg-login.jpg')",
      },
    },
    screens: {
      cp: "550px",
      mcp: { max: "550px" },
      sm: "640px",
      msm: { max: "640px" },
      md: "768px",
      mmd: { max: "768px" },
      md992: { min: "992px" },
      mmd992: { max: "992px" },
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
