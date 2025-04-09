import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all your source files
  ],
theme: {
    extend: {
      colors: {
        ...defaultTheme.colors, // 👈 re-enable all default Tailwind colors
      },
    },
  },
  plugins: [],
};
