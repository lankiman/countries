/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      custom: ["Nunito Sans", "sans-serif"]
    },
    fontWeight: {
      normal: 300,
      bold: 400,
      extrabold: 800
    },
    extend: {
      colors: {
        elements: { dark: "hsl(209, 23%, 22%)", light: "hsl(0, 0%, 100%)" },
        texts: { light: "hsl(200, 15%, 8%)", dark: "hsl(0, 0%, 100%)" },
        backgrounds: { light: "hsl(0, 0%, 98%)", dark: "hsl(207, 26%, 17%)" },
        inputs: { light: "hsl(0, 0%, 52%)", dark: "hsl(0, 0%, 100%)" }
      }
    }
  },
  plugins: []
};
