/**
 * Composable for theme management using Catppuccin colors
 */
export const useTheme = () => {
  // Dans Nuxt 3, useColorMode est disponible globalement sans importation
  const colorMode = useColorMode()
  
  // Available color modes
  const availableThemes = [
    { name: 'mocha', label: 'Catppuccin Mocha (Dark)', icon: 'heroicons:moon' },
    { name: 'latte', label: 'Catppuccin Latte (Light)', icon: 'heroicons:sun' }
  ]
  
  // Current theme
  const currentTheme = computed(() => {
    return availableThemes.find(theme => theme.name === colorMode.preference) || availableThemes[0]
  })
  
  // Toggle between dark and light mode
  const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'mocha' ? 'latte' : 'mocha'
  }
  
  // Set a specific theme
  const setTheme = (theme: string) => {
    if (availableThemes.some(t => t.name === theme)) {
      colorMode.preference = theme
    }
  }

  return {
    currentTheme,
    availableThemes,
    toggleTheme,
    setTheme
  }
}