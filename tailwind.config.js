/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        title: 'clamp(2.5rem, 5.5vw, 4.5rem)',
        subtitle: 'clamp(1.5rem, 3.5vw, 3rem)',
      },
      screens: {
        hd: '1280px',
        'full-hd': '1920px',
      },
      backgroundSize: {
        '100%': '100% auto',
        '200%': '200% auto',
        '300%': '300% auto',
        '400%': '400% auto',
      },
      animation: {
        'background-linear': 'background-animate 6s ease infinite',
      },
      keyframes: {
        'background-animate': {
          'from, to': {
            'background-position': '0 0',
          },
          '50%': {
            'background-position': '100% 0',
          },
        },
      },
    },
  },
};
