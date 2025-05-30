import { ref } from 'vue'

type Theme = 'latte' | 'frappe' | 'macchiato' | 'mocha'

// Since the application currently uses static Mocha theme colors,
// this is a placeholder implementation that maintains the interface
// expected by TerminalPanel but doesn't actually change themes
export const useTheme = () => {
  // Fixed theme as the app uses static Mocha colors
  const theme = ref<Theme>('mocha')

  // Placeholder function that accepts theme parameter but doesn't change anything
  // This maintains compatibility with TerminalPanel
  const setTheme = (newTheme: Theme) => {
    console.log(`Theme change requested to: ${newTheme}`)
    console.log('Note: This portfolio currently uses a fixed Catppuccin Mocha theme.')
    // In a future implementation, this would:
    // 1. Update CSS variables
    // 2. Save to localStorage
    // 3. Apply theme classes
  }

  return {
    theme,
    setTheme
  }
}