module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        magenta: {
          DEFAULT: '#ff00ff',
          50: '#fff0ff',
          100: '#ffe0ff',
          200: '#ffc0ff',
          300: '#ff90ff',
          400: '#ff50ff',
          500: '#ff00ff',
          600: '#d400d4',
          700: '#a800a8',
          800: '#7c007c',
          900: '#500050',
        },
        dark: {
          DEFAULT: '#080808',
          50: '#1a1a1a',
          100: '#0f0f0f',
        },
        light: {
          DEFAULT: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
        }
      },
      animation: {
        'aurora': 'aurora 60s linear infinite',
        'beam': 'beam 7s linear infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%'
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%'
          },
        },
        beam: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(100%)'
          },
        },
        sparkle: {
          '0%, 100%': {
            opacity: 0,
            transform: 'scale(0)'
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1)'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
