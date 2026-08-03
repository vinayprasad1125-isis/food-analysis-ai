module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        accent: '#A3E635',
        secondary: '#60A5FA',
        bg: '#FCFCFC'
      },
      maxWidth: {
        '8xl': '1280px'
      }
    }
  },
  plugins: [],
}
