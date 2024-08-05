/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, 384px)',
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1025px', // Change lg breakpoint to 1024px
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}
