/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#86D2CD',
        customColor1:'#4753B9'
      }
    },
  },
  plugins: [],
}

