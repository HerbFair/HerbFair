/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./web-client/src/pages/admin-login/SellerLogin.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
