import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Catppuccin Mocha
        'base': 'var(--ctp-mocha-base)',
        'mantle': 'var(--ctp-mocha-mantle)',
        'crust': 'var(--ctp-mocha-crust)',
        'surface0': 'var(--ctp-mocha-surface0)',
        'surface1': 'var(--ctp-mocha-surface1)',
        'surface2': 'var(--ctp-mocha-surface2)',
        'overlay0': 'var(--ctp-mocha-overlay0)',
        'overlay1': 'var(--ctp-mocha-overlay1)',
        'overlay2': 'var(--ctp-mocha-overlay2)',
        'text': 'var(--ctp-mocha-text)',
        'subtext0': 'var(--ctp-mocha-subtext0)',
        'subtext1': 'var(--ctp-mocha-subtext1)',
        'rosewater': 'var(--ctp-mocha-rosewater)',
        'flamingo': 'var(--ctp-mocha-flamingo)',
        'pink': 'var(--ctp-mocha-pink)',
        'mauve': 'var(--ctp-mocha-mauve)',
        'red': 'var(--ctp-mocha-red)',
        'maroon': 'var(--ctp-mocha-maroon)',
        'peach': 'var(--ctp-mocha-peach)',
        'yellow': 'var(--ctp-mocha-yellow)',
        'green': 'var(--ctp-mocha-green)',
        'teal': 'var(--ctp-mocha-teal)',
        'sky': 'var(--ctp-mocha-sky)',
        'sapphire': 'var(--ctp-mocha-sapphire)',
        'blue': 'var(--ctp-mocha-blue)',
        'lavender': 'var(--ctp-mocha-lavender)'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
} satisfies Config