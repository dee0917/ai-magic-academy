/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Chivo', 'Noto Sans TC', 'sans-serif'],
        serif: ['Noto Serif TC', 'serif'],
        display: ['Rye', 'serif'],
        signature: ['La Belle Aurore', 'cursive'],
      },
      colors: {
        magic: {
          primary: '#E8A838',    // Mustard Yellow
          bg: '#F4EED8',         // Parchment Cream
          text: '#2A2723',       // Ink Black
          teal: '#1A5C5A',       // Retro Teal
          red: '#8B2626',        // Dark Red
        },
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        }
      },
      boxShadow: {
        'brutalist': '8px 8px 0px #2A2723',
        'brutalist-hover': '12px 12px 0px #2A2723',
        'brutalist-sm': '4px 4px 0px #2A2723',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'shake': 'shake 0.2s ease-in-out infinite',
      },
      keyframes: {
        scroll: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        }
      }
    },
  },
  plugins: [],
}
