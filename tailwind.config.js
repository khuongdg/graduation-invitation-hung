/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fffae1',
          200: '#fff4b5',
          300: '#ffe97d',
          400: '#ffd643',
          500: '#e5b800',
          600: '#ca9600',
          700: '#a16e00',
          800: '#835509',
          900: '#6e440e',
        },
        navy: {
          800: '#0b132b',
          900: '#070a14',
          950: '#03050a',
        },
        emeraldGlow: {
          500: '#10b981',
          400: '#34d399',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(circle at center, rgba(229, 184, 0, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(229, 184, 0, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(229, 184, 0, 0.7))' },
        }
      }
    },
  },
  plugins: [],
};
