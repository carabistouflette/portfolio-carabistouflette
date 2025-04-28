import { ref, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';

/**
 * @description Represents the available theme names for the application.
 * Based on Catppuccin themes: https://github.com/catppuccin/catppuccin
 */
export type ThemeName = 'latte' | 'frappe' | 'macchiato' | 'mocha';

/**
 * @description An array containing all valid theme names.
 */
export const availableThemes: ThemeName[] = ['latte', 'frappe', 'macchiato', 'mocha'];

/**
 * @description The default theme to apply if no preference is found in local storage
 * or if an invalid theme name is encountered.
 */
const defaultTheme: ThemeName = 'mocha';

/**
 * @description Composable for managing the application's color theme.
 * It provides reactive state for the current theme, a function to change the theme,
 * and handles persistence across sessions using `localStorage`.
 * It automatically applies the corresponding theme class to the root HTML element (`<html>`).
 *
 * @returns {object} An object containing:
 * - `theme`: A Vue ref (`Ref<ThemeName>`) holding the current theme name. It's synced with `localStorage`.
 * - `setTheme`: A function `(newTheme: ThemeName) => void` to update the current theme.
 * - `availableThemes`: An array `ThemeName[]` listing all valid theme names.
 *
 * @example
 * ```typescript
 * import { useTheme } from './composables/useTheme';
 *
 * const { theme, setTheme, availableThemes } = useTheme();
 *
 * console.log('Current theme:', theme.value);
 *
 * // Change theme to 'latte'
 * setTheme('latte');
 *
 * // Check if 'frappe' is a valid theme
 * if (availableThemes.includes('frappe')) {
 *   // ...
 * }
 * ```
 */
export function useTheme() {
  /**
   * @description Reactive reference to the current theme name.
   * Synced with `localStorage` under the key 'theme-preference'.
   * Defaults to `defaultTheme` if no valid theme is found in storage.
   * @type {import('@vueuse/core').RemovableRef<ThemeName>}
   */
  const theme = useStorage<ThemeName>('theme-preference', defaultTheme);

  /**
   * @description Updates the application theme.
   * If the provided theme name is valid, it updates the reactive `theme` ref
   * (which automatically persists to `localStorage` via `useStorage`)
   * and the `watchEffect` updates the DOM class.
   * Logs a warning if an invalid theme name is provided.
   *
   * @param {ThemeName} newTheme - The name of the theme to apply.
   * @returns {void}
   */
  const setTheme = (newTheme: ThemeName) => {
    if (availableThemes.includes(newTheme)) {
      theme.value = newTheme; // This automatically updates localStorage thanks to useStorage
    } else {
      console.warn(`Attempted to set invalid theme: ${newTheme}. Available themes are: ${availableThemes.join(', ')}`);
    }
  };

  // Watch for changes in the theme ref and update the HTML root element class.
  // This effect runs only on the client-side where `document` is available.
  if (typeof document !== 'undefined') {
    watchEffect(() => {
      const currentTheme = theme.value;
      const root = document.documentElement;

      // Ensure the stored theme is valid before applying
      const themeToApply = availableThemes.includes(currentTheme) ? currentTheme : defaultTheme;

      // Remove any existing theme classes from the available list
      availableThemes.forEach(t => root.classList.remove(t));

      // Add the new theme class
      root.classList.add(themeToApply);

      // If the stored theme was invalid, correct it in storage and the ref
      if (themeToApply !== currentTheme) {
        console.warn(`Invalid theme "${currentTheme}" found in storage. Applying default theme "${defaultTheme}".`);
        theme.value = themeToApply;
      }

      // Optional: Set a data attribute as well for CSS targeting
      // root.setAttribute('data-theme', themeToApply);
    });
  }

  // Expose the reactive theme state, the setter function, and available themes
  return {
    /**
     * @description Reactive reference to the current theme name, synced with localStorage.
     * @type {import('@vueuse/core').RemovableRef<ThemeName>}
     */
    theme,
    /**
     * @description Function to set a new theme.
     * @type {(newTheme: ThemeName) => void}
     */
    setTheme,
    /**
     * @description Array of all available theme names.
     * @type {ThemeName[]}
     */
    availableThemes,
  };
}