/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      colors: {
        // Calm gold
        gold: {
          50: '#faf6ec',
          100: '#f3e9cf',
          200: '#e7d29e',
          300: '#dabd72',
          400: '#cfa94e',
          500: '#c19536',
          600: '#a67c2b',
          700: '#856126',
          800: '#6d4f24',
          900: '#5c4321',
        },
        // Cool silver
        silver: {
          50: '#f7f8fa',
          100: '#eef0f4',
          200: '#e2e6ed',
          300: '#cbd2dd',
          400: '#a9b3c2',
          500: '#8792a4',
          600: '#697384',
          700: '#545c6b',
          800: '#454b57',
          900: '#3b404a',
        },
        ink: {
          DEFAULT: '#2a2e37',
          soft: '#4a5160',
          faint: '#78808f',
        },
        primary: '#c19536',
        active: '#2a2e37',
        success: '#3f9d6e',
        warning: '#d9a33a',
        error: '#d15b58',
        info: '#4b7fb5',
      },
      borderRadius: {
        primary: '1.75rem',
      },
      boxShadow: {
        glass: '0 8px 32px -12px rgba(30, 41, 59, 0.18)',
        'glass-lg': '0 20px 60px -20px rgba(30, 41, 59, 0.28)',
        gold: '0 10px 30px -10px rgba(193, 149, 54, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
