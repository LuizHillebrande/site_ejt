/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e69138",
        secondary: "#FFA040",
        background: "#F7F9FC",
        white: "#FFFFFF",
        dark: "#1B1B1B",
      },
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
} 