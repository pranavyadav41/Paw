import withMT from "@material-tailwind/react/utils/withMT";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#86D2CD',
        customColor1:'#4753B9',
        customColor3:'#FFD404'
      }
    },
  },
  plugins: [],
}

