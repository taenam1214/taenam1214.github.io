module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand green (the `magenta` token name is kept so existing utility
        // classes keep working, but the ramp is now the green→cyan→blue system).
        magenta: {
          DEFAULT: '#15e6a0',
          50: '#eafff7',
          100: '#c9ffed',
          200: '#90f7d4',
          300: '#4fefc0',
          400: '#2be9ae',
          500: '#15e6a0',
          600: '#0fbf86',
          700: '#0c9469',
          800: '#0a6e50',
          900: '#084a36',
        },
        // Explicit green alias for new code
        brand: {
          DEFAULT: '#15e6a0',
          400: '#2be9ae',
          500: '#15e6a0',
          600: '#0fbf86',
        },
        // Blue accent that completes the green→cyan→blue gradient
        azure: {
          DEFAULT: '#3b82f6',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        dark: {
          DEFAULT: '#04060a',
          50: '#0a0e16',
          100: '#0f1420',
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
        'name-reveal': 'name-reveal 1.05s cubic-bezier(.16,1,.3,1) forwards',
        'name-sheen': 'name-sheen 2.2s cubic-bezier(.4,0,.2,1) forwards',
        'ticker': 'ticker 34s linear infinite',
      },
      keyframes: {
        'name-reveal': {
          '0%': { transform: 'translateY(112%)', opacity: 0, filter: 'blur(12px)' },
          '55%': { opacity: 1, filter: 'blur(0)' },
          '100%': { transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' },
        },
        'name-sheen': {
          from: { backgroundPosition: '120% 0' },
          to: { backgroundPosition: '0% 0' },
        },
        ticker: {
          to: { transform: 'translateX(-50%)' },
        },
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
        display: ['Inter', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      }
    },
  },
  plugins: [],
}
