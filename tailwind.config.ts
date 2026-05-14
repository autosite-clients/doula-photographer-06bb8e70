import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-heebo)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-frank)', 'Georgia', 'serif'],
      },
      colors: {
        rose: {
          50: '#fdf6f6',
          100: '#fbeaea',
          200: '#f5d4d4',
          300: '#ecaeae',
          400: '#dd7e7e',
          500: '#c95757',
          600: '#a94545',
          700: '#893939',
          800: '#6e3030',
          900: '#5a2a2a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
