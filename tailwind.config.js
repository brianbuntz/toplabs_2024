// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B46C1', // Elegant Purple
        secondary: '#4299E1', // Elegant Blue
        background: '#000000',
        text: '#FFFFFF',
        'footer-bg': 'var(--footer-bg)',
      },
    },
  },
  plugins: [],
};
