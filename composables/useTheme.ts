import { ref, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';

// Define the available theme names
export type ThemeName = 'latte' | 'frappe' | 'macchiato' | 'mocha';
export const availableThemes: ThemeName[] = ['latte', 'frappe', 'macchiato', 'mocha'];

// Default theme if none is set in storage
const defaultTheme: ThemeName = 'mocha';

export function useTheme() {
  // Use useStorage to persist the theme preference in local storage
  // The ref will automatically sync with local storage
  const theme = useStorage<ThemeName>('theme-preference', defaultTheme);

  // Function to update the theme
  const setTheme = (newTheme: ThemeName) => {
    if (availableThemes.includes(newTheme)) {
      theme.value = newTheme;
    } else {
      console.warn(`Attempted to set invalid theme: ${newTheme}`);
    }
  };

  // Watch for changes in the theme ref and update the HTML root element class
  // This effect runs only on the client-side where `document` is available
  if (typeof document !== 'undefined') {
    watchEffect(() => {
      const currentTheme = theme.value;
      const root = document.documentElement;

      // Remove any existing theme classes
      availableThemes.forEach(t => root.classList.remove(t));

      // Add the new theme class
      if (availableThemes.includes(currentTheme)) {
        root.classList.add(currentTheme);
        // Optionally, set a data attribute as well
        // root.setAttribute('data-theme', currentTheme);
      } else {
        // Fallback to default if the stored value is somehow invalid
        root.classList.add(defaultTheme);
        theme.value = defaultTheme; // Correct the stored value
      }
    });
  }

  // Expose the reactive theme state and the setter function
  return {
    theme,
    setTheme,
    availableThemes,
  };
}