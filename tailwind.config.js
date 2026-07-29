/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        heading: ['Onest Variable', 'sans-serif']
      },
      colors: {
        primary: '#F59E0B',
        secondary: '#FBBF24',
        dark: {
          100: '#1A1A1A',
          200: '#242424',
          300: '#111111'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)' }
        }
      }
    }
  },
  plugins: []
}
