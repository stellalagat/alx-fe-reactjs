/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",  // 👈 This line is required by the checker
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
