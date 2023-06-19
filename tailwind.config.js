/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cinzel)"],
        sans: ["var(--font-montserrat)"],
      },
      keyframes: {
        "toast-show": {
          from: { opacity: 0, transform: "scale(0.96) translate(50px)" },
          to: { opacity: 1, transform: "scale(1) translate(0)" },
        },
        "toast-hide": {
          from: { opacity: 1, transform: "scale(1) translate(0)" },
          to: { opacity: 0, transform: "scale(0.96) translate(50px)" },
        },
        "menu-show": {
          from: { opacity: 0, transform: "scale(0.96) translateY(-10px)" },
          to: { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        "menu-hide": {
          from: { opacity: 1, transform: "scale(1) translateY(0)" },
          to: { opacity: 0, transform: "scale(0.96) translateY(-10px)" },
        },
        "accordion-show": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-hide": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "toast-show": "toast-show 0.3s ease-out",
        "toast-hide": "toast-hide 0.3s ease-out",
        "menu-show": "menu-show 0.3s ease-out",
        "menu-hide": "menu-hide 0.3s ease-out",
        "accordion-show": "accordion-show 0.3s ease-out",
        "accordion-hide": "accordion-hide 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
