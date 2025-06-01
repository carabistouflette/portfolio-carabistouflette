import { ref, watch, onMounted } from 'vue'
import { catppuccinThemes } from '~/constants/colors'

type Theme = 'latte' | 'frappe' | 'macchiato' | 'mocha'

const THEME_KEY = 'portfolio-theme'

export const useTheme = () => {
  const theme = ref<Theme>('mocha')

  const applyTheme = (themeName: Theme, instant = false) => {
    const selectedTheme = catppuccinThemes[themeName]
    const root = document.documentElement

    // Temporarily disable transitions for instant theme change
    if (instant) {
      root.style.setProperty('--theme-transition-backup', getComputedStyle(root).getPropertyValue('--transition-colors'))
      root.style.setProperty('--transition-colors', 'none')
    }

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    root.setAttribute('data-theme', themeName)
    
    // Update color scheme for system UI elements
    root.style.colorScheme = themeName === 'latte' ? 'light' : 'dark'

    // Re-enable transitions after a frame
    if (instant) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const backup = root.style.getPropertyValue('--theme-transition-backup')
          root.style.setProperty('--transition-colors', backup)
          root.style.removeProperty('--theme-transition-backup')
        })
      })
    }
  }

  const setTheme = (newTheme: Theme) => {
    // Add a small delay to make the transition feel more intentional
    const root = document.documentElement
    root.style.setProperty('--theme-transition-duration', '350ms')
    
    theme.value = newTheme
    applyTheme(newTheme, false) // Use smooth transition
    localStorage.setItem(THEME_KEY, newTheme)
    
    // Reset transition duration after theme change
    setTimeout(() => {
      root.style.removeProperty('--theme-transition-duration')
    }, 400)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'mocha' : 'latte')
    
    theme.value = initialTheme
    applyTheme(initialTheme, true) // Apply instantly on mount
  })

  watch(theme, (newTheme) => {
    applyTheme(newTheme, false) // Use smooth transition for manual changes
  })

  return {
    theme,
    setTheme
  }
}