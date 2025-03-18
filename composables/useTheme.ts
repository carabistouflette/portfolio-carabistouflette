/**
 * Composable pour simuler un thème Catppuccin cohérent
 * Dans une véritable application, on utiliserait @nuxtjs/color-mode
 * mais pour notre démo, nous allons simplement simuler un thème.
 */
export const useTheme = () => {
  // État du thème - nous utiliserons uniquement Mocha pour cet exemple
  const isDarkMode = ref(true)
  
  // Thèmes disponibles (même si nous n'utilisons que Mocha pour l'instant)
  const availableThemes = [
    { name: 'mocha', label: 'Catppuccin Mocha (Dark)', icon: 'heroicons:moon' }
  ]
  
  // Thème actuel
  const currentTheme = computed(() => {
    return availableThemes[0]
  })
  
  // Pour une future implémentation de changement de thème
  const toggleTheme = () => {
    console.log('Alternance de thème désactivée - utilisation fixe de Catppuccin Mocha')
  }
  
  // Pour une future implémentation de changement de thème
  const setTheme = (theme: string) => {
    console.log(`Définition du thème désactivée - utilisation fixe de Catppuccin Mocha`)
  }

  return {
    currentTheme,
    availableThemes,
    toggleTheme,
    setTheme
  }
}