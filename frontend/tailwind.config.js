/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // ensure it scans your files
  darkMode: 'class', // enables toggling with 'dark' class
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        heading: 'var(--color-heading)',
        subheading: 'var(--color-subheading)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
