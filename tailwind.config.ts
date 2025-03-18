import type { Config } from 'tailwindcss'

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
        // Catppuccin Mocha - directement avec les valeurs hexadécimales
        'base': '#1e1e2e',
        'mantle': '#181825',
        'crust': '#11111b',
        'surface0': '#313244',
        'surface1': '#45475a',
        'surface2': '#585b70',
        'overlay0': '#6c7086',
        'overlay1': '#7f849c',
        'overlay2': '#9399b2',
        'text': '#cdd6f4',
        'subtext0': '#a6adc8',
        'subtext1': '#bac2de',
        'rosewater': '#f5e0dc',
        'flamingo': '#f2cdcd',
        'pink': '#f5c2e7',
        'mauve': '#cba6f7',
        'red': '#f38ba8',
        'maroon': '#eba0ac',
        'peach': '#fab387',
        'yellow': '#f9e2af',
        'green': '#a6e3a1',
        'teal': '#94e2d5',
        'sky': '#89dceb',
        'sapphire': '#74c7ec',
        'blue': '#89b4fa',
        'lavender': '#b4befe'
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