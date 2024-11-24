
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Scans all files in the src directory and index.html
  darkMode: 'class', // Enables dark mode (class-based)
  theme: {
    extend: {}, // Customize the default Tailwind theme here
  },
  plugins: [], // Add Tailwind plugins here if needed
};
