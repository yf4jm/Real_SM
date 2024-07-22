/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, 384px)',
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
      },
    },
  },
  plugins: [],
}

