/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#EBF2EE',
          100: '#D6E5DC',
          200: '#ADCBB9',
          300: '#84B196',
          400: '#5B9773',
          500: '#3D7D57',
          600: '#2B3D35',
          700: '#1E2E27',
          800: '#141F1B',
          900: '#0F1A15',
          950: '#08100D',
        },
        sage: {
          50:  '#F0F6F3',
          100: '#D6EDE5',
          200: '#A8C5B8',
          300: '#7A9E8E',
          400: '#5C7A6E',
          500: '#3E5650',
        },
        cream: {
          50:  '#FDFCF9',
          100: '#F8F4ED',
          200: '#EDE8DF',
          300: '#DDD5C8',
        },
        terracotta: {
          50:  '#FCF0E8',
          100: '#F5D9C5',
          200: '#E8B594',
          300: '#D4956F',
          400: '#C47A51',
          500: '#A45F38',
          600: '#854A27',
        },
        wheat: '#D4B896',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
