import { useIntersectionObserver } from '@vueuse/core'
import { ref, watch, type Ref } from 'vue'

/**
 * @description Composable providing utility functions for various animations.
 * Includes scroll-triggered animations for single elements and lists,
 * timing generation for staggered animations, color conversion, and smooth scrolling.
 *
 * @returns {object} An object containing animation utility functions:
 * - `animateOnScroll`: Applies an animation class to an element when it enters the viewport.
 * - `animateListOnScroll`: Applies scroll-triggered animations to a list of elements with a stagger effect.
 * - `createStaggerTiming`: Generates an array of delay timings for staggered animations.
 * - `hexToRGBA`: Converts a HEX color code to an RGBA string.
 * - `smoothScrollTo`: Smoothly scrolls the page to a specified element ID.
 *
 * @example
 * ```typescript
 * import { ref } from 'vue';
 * import { useAnimations } from './composables/useAnimations';
 *
 * const myElement = ref(null);
 * const { animateOnScroll, smoothScrollTo } = useAnimations();
 *
 * // Apply fade-in animation on scroll
 * animateOnScroll(myElement, 'animate-fade-in');
 *
 * // Smooth scroll to an element
 * smoothScrollTo('section-about');
 * ```
 */
export const useAnimations = () => {
  /**
   * @description Applies an animation class to a target element when it becomes visible in the viewport.
   * The element starts with `opacity-0` and transitions to the provided animation class.
   * The animation only runs once per element.
   *
   * @param {Ref<HTMLElement | null>} target - A Vue ref pointing to the DOM element to animate.
   * @param {string} animationClass - The CSS class(es) to apply for the animation (e.g., 'animate-fade-in', 'slide-up').
   * @param {number} [threshold=0.1] - The intersection observer threshold (0.0 to 1.0) determining how much of the element must be visible before triggering.
   * @param {number} [delay=0] - Delay in milliseconds before the animation starts after the element is intersecting.
   * @returns {Function} A function that can be called to manually trigger the animation if needed before intersection.
   */
  const animateOnScroll = (
    target: Ref<HTMLElement | null>,
    animationClass: string,
    threshold = 0.1,
    delay = 0
  ) => {
    const initialClasses = 'opacity-0 transition-all duration-700 ease-out'
    let hasAnimated = false // Flag to ensure animation runs only once per element

    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !hasAnimated) {
          hasAnimated = true

          if (target.value) {
            // Apply initial styling (hidden) before the animation starts
+             // This prevents a flash of unstyled content if the element is already in view on load
            target.value.classList.add(...initialClasses.split(' '))
          }

          setTimeout(() => {
            if (target.value) {
              target.value.classList.remove('opacity-0')
              target.value.classList.add(animationClass)
            }
          }, delay)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before element is fully in view from bottom
      }
    )

    // Return a function to manually trigger animation if needed
    return () => {
      if (target.value && !hasAnimated) {
        hasAnimated = true
        target.value.classList.add(...initialClasses.split(' '))

        setTimeout(() => {
          if (target.value) {
            target.value.classList.remove('opacity-0')
            target.value.classList.add(animationClass)
          }
        }, delay)
      }
    }
  }

  /**
   * @description Applies scroll-triggered animations to a list of target elements with a staggering effect.
   * Uses `animateOnScroll` internally for each element.
   *
   * @param {Ref<HTMLElement[]>} targets - A Vue ref pointing to an array of DOM elements to animate.
   * @param {string} animationClass - The CSS class(es) to apply for the animation.
   * @param {number} [threshold=0.1] - The intersection observer threshold for each element.
   * @param {number} [staggerDelay=100] - Delay in milliseconds between the start of each subsequent element's animation.
   */
  const animateListOnScroll = (
    targets: Ref<HTMLElement[]>,
    animationClass: string,
    threshold = 0.1,
    staggerDelay = 100
  ) => {
    // Watch the targets ref for changes (e.g., when elements are rendered by v-for)
+     // This ensures that dynamically added elements are also animated.
    watch(targets, (elements) => {
      elements.forEach((el, index) => {
        const delay = index * staggerDelay
        // Create a new ref for each individual element because useIntersectionObserver requires a Ref
+         // We cannot directly pass the loop variable 'el'
        const targetRef = ref(el) // Create a ref for each individual element
        animateOnScroll(targetRef, animationClass, threshold, delay)
      })
    }, { immediate: true }) // Run immediately to catch initially rendered elements
  }

  /**
   * @description Generates an array of numbers representing animation delays for creating stagger effects.
   *
   * @param {number} count - The number of items to generate delays for.
   * @param {number} [duration=1] - The total duration over which the staggering should occur (in seconds or arbitrary units).
   * @param {number} [delay=0] - An initial delay before the first item starts (in the same units as duration).
   * @returns {number[]} An array of delay values.
   *
   * @example
   * ```typescript
   * const timings = createStaggerTiming(5, 1, 0.2); // [0.2, 0.4, 0.6, 0.8, 1.0] (assuming duration is in seconds)
   * ```
   */
  const createStaggerTiming = (count: number, duration = 1, delay = 0): number[] => {
    const delays: number[] = []
    const step = duration / count

    for (let i = 0; i < count; i++) {
      delays.push(delay + i * step)
    }

    return delays
  }

  /**
   * @description Converts a HEX color string (e.g., '#FF5733') to an RGBA color string.
   *
   * @param {string} hex - The HEX color code (must start with '#').
   * @param {number} [alpha=1] - The alpha transparency value (0.0 to 1.0).
   * @returns {string} The RGBA color string (e.g., 'rgba(255, 87, 51, 1)'). Returns an empty string if hex is invalid.
   */
  const hexToRGBA = (hex: string, alpha = 1): string => {
    if (!hex || !hex.startsWith('#') || (hex.length !== 4 && hex.length !== 7)) {
      console.error('Invalid HEX color format provided to hexToRGBA:', hex);
      return ''; // Return empty or a default color?
    }

    let rHex = '', gHex = '', bHex = '';

    if (hex.length === 4) { // Handle shorthand hex (e.g., #RGB)
      rHex = hex.slice(1, 2) + hex.slice(1, 2);
      gHex = hex.slice(2, 3) + hex.slice(2, 3);
      bHex = hex.slice(3, 4) + hex.slice(3, 4);
    } else { // Handle full hex (e.g., #RRGGBB)
      rHex = hex.slice(1, 3);
      gHex = hex.slice(3, 5);
      bHex = hex.slice(5, 7);
    }

    const r = parseInt(rHex, 16)
    const g = parseInt(gHex, 16)
    const b = parseInt(bHex, 16)

    // Clamp alpha value
    const validAlpha = Math.max(0, Math.min(1, alpha));

    return `rgba(${r}, ${g}, ${b}, ${validAlpha})`
  }

  /**
   * @description Smoothly scrolls the window to the vertical position of a specified element.
   *
   * @param {string} elementId - The ID of the target element to scroll to.
   * @param {number} [offset=0] - An offset in pixels from the top of the element. Positive values scroll slightly above the element, negative values slightly below.
   * @param {number} [duration=500] - The duration of the scroll animation in milliseconds.
   * @returns {void}
   */
  const smoothScrollTo = (elementId: string, offset = 0, duration = 500): void => {
    const element = document.getElementById(elementId)

    if (!element) {
      console.warn(`Smooth scroll target element with ID "${elementId}" not found.`);
      return
    }

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      // Use an easing function for smoother animation (ease-out quad)
      const progress = Math.min(timeElapsed / duration, 1) // Normalized progress (0 to 1)
      const easeProgress = progress * (2 - progress) // Ease-out quadratic easing: starts fast, slows down

      window.scrollTo(0, startPosition + distance * easeProgress)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  return {
    animateOnScroll,
    animateListOnScroll,
    createStaggerTiming,
    hexToRGBA,
    smoothScrollTo
  }
}