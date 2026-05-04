
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'retro': ['VT323', 'monospace'],
      },
     colors: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'background': 'var(--color-background)',
        'text': 'var(--color-text)',
        'success': 'var(--color-success)',
        'info': 'var(--color-info)',
        'white': 'var(--color-white)',
        'black': 'var(--color-black)',
        'hover': 'var(--color-hover)', 
      },
    },
  },
  plugins: [], 
};