import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefaf0',
          100: '#fcf2d8',
          200: '#f8e2af',
          300: '#f0ca72',
          400: '#e4b03e',
          500: '#d4a030',
          600: '#ab7a1a',
          700: '#875d16',
          800: '#6e4b16',
          900: '#5b3e16',
          950: '#33200a',
        },
        accent: {
          50: '#fff4ee',
          100: '#ffe6d4',
          200: '#ffc9a8',
          300: '#f7a370',
          400: '#f37137',
          500: '#ef5216',
          600: '#c43e1c',
          700: '#a32e15',
          800: '#842818',
          900: '#6f2418',
          950: '#3c0f0a',
        },
        navy: {
          50: '#f2f6fa',
          100: '#e1e9f1',
          200: '#c9d7e5',
          300: '#a4bdd2',
          400: '#799cb9',
          500: '#5a7fa2',
          600: '#486789',
          700: '#3c5470',
          800: '#34475d',
          900: '#1a2e44',
          950: '#131f30',
        },
      },
      fontFamily: {
        arabic: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
