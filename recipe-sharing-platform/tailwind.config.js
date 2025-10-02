/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // Vite's root HTML
    "./public/index.html",         // For compatibility with the checker
    "./src/**/*.{js,ts,jsx,tsx}",  // Your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
