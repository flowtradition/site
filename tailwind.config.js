const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const aspectRatio = require("@tailwindcss/aspect-ratio");
const forms = require("@tailwindcss/forms");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [aspectRatio, forms],
};
