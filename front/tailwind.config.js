/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['32px', '50px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        georgia: ['Georgia', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        backgroundColor: ['even'],
      },
      colors: {
        "bg-main": "#2C2A2A",
        "main-yellow": "#FAAF20",
        "orange": "#B4884F",
        "main-dark": "#212223",
        "nav-text": "rgba(197, 197, 197, 0.70)",
        "main-gray": "rgba(255, 255, 255, 0.50)",
        "main-lightgray": "rgba(255, 255, 255, 0.10)",
        "main-background": "rgba(33, 34, 35, 0.80)",
        "main-text": "#212223"
      },
    }
  },
  plugins: [],
}