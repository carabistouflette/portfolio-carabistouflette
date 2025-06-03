import { ref, watch, onUnmounted, computed, type Ref } from 'vue' // Import computed
import { useMouseInElement } from '@vueuse/core'

interface UseMagneticEffectOptions {
  maxDistance?: number // Max distance (px) to react
  pullFactor?: number // How strongly it pulls (adjusts translation)
  scaleFactor?: number // How much it scales on approach
  disabled?: Ref<boolean> | boolean // Optionally disable the effect
}

export function useMagneticEffect(
  target: Ref<HTMLElement | null | undefined>,
  options: UseMagneticEffectOptions = {}
) {
  const {
    maxDistance = 50, // Default max distance
    pullFactor = 0.4, // Default pull strength
    scaleFactor = 0.05, // Default scale increase (1 + 0.05 = 1.05x)
    disabled = ref(false)
  } = options

  // Defer initialization until the target element is available
  const isInitialized = ref(false)
  const isActive = ref(false) // Track if effect is actively applied
  const smoothTransform = ref('translate(0px, 0px) scale(1)')
  let cleanupMouseEffect: (() => void) | null = null
  const elementX = ref(0)
  const elementY = ref(0)
  const isOutside = ref(true)
  const elementHeight = ref(0)
  const elementWidth = ref(0)

  let animationFrameId: number | null = null // Keep this if requestAnimationFrame is used later

  const updateEffect = () => {
    if (!target.value || isOutside.value || (typeof disabled === 'boolean' ? disabled : disabled.value)) {
      if (isActive.value) {
        smoothTransform.value = 'translate(0px, 0px) scale(1)'
        isActive.value = false
      }
      return
    }

    isActive.value = true
    const centerX = elementWidth.value / 2
    const centerY = elementHeight.value / 2

    const deltaX = elementX.value - centerX
    const deltaY = elementY.value - centerY

    // Simple distance check (could use Pythagoras for circular, but box is fine)
    const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY))

    // Calculate pull based on distance (stronger when closer)
    // Inverse relationship: (maxDistance - distance) / maxDistance
    const pullRatio = Math.max(0, (maxDistance - distance) / maxDistance)

    const translateX = deltaX * pullFactor * pullRatio
    const translateY = deltaY * pullFactor * pullRatio
    const scale = 1 + scaleFactor * pullRatio

    smoothTransform.value = `translate(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px) scale(${scale.toFixed(3)})`

    // Optional: Use requestAnimationFrame for potentially smoother updates,
    // though watcher might be sufficient with CSS transitions.
    // if (animationFrameId) cancelAnimationFrame(animationFrameId);
    // animationFrameId = requestAnimationFrame(() => {
    //   if (target.value) {
    //     target.value.style.transform = smoothTransform.value;
    //   }
    // });
  }

  // Watch the target ref and initialize the effect only when it's valid
  const stopWatchTarget = watch(
    target,
    (newTarget) => {
      if (newTarget && !isInitialized.value) {
        // --- Initialize ---
        const mouseEffect = useMouseInElement(target as Ref<HTMLElement>) // Cast as non-null here
        elementX.value = mouseEffect.elementX.value
        elementY.value = mouseEffect.elementY.value
        isOutside.value = mouseEffect.isOutside.value
        elementHeight.value = mouseEffect.elementHeight.value
        elementWidth.value = mouseEffect.elementWidth.value

        // Setup watcher that depends on useMouseInElement refs
        watch([elementX, elementY, isOutside], updateEffect, { immediate: true }) // Remove logging wrapper

        // Apply initial style and transition (was in onMounted)
        newTarget.style.transition = 'transform 0.1s linear'
        newTarget.style.willChange = 'transform'

        isInitialized.value = true

        // Store cleanup function provided by useMouseInElement if available (check its return type)
        // cleanupMouseEffect = mouseEffect.stop // Assuming useMouseInElement returns a stop function

        // --- End Initialize ---
      } else if (!newTarget && isInitialized.value) {
        // --- Cleanup if target becomes null after initialization ---
        if (cleanupMouseEffect) {
          cleanupMouseEffect()
          cleanupMouseEffect = null
        }
        // Reset styles or state if needed
        smoothTransform.value = 'translate(0px, 0px) scale(1)'
        isActive.value = false
        isInitialized.value = false
        // Stop the inner watcher? Might not be necessary if useMouseInElement handles it
      }
    },
    { immediate: true, flush: 'post' } // immediate: check on mount, flush: run after DOM updates
  )

  // Cleanup on component unmount
  onUnmounted(() => {
    stopWatchTarget() // Stop watching the target ref
    if (cleanupMouseEffect) {
      cleanupMouseEffect() // Cleanup useMouseInElement listeners
    }
    // Optional: Reset styles on the element if it still exists?
    // Usually not needed as the element is being destroyed.
    // if (target.value && isInitialized.value) {
    //   target.value.style.transform = 'translate(0px, 0px) scale(1)';
    //   target.value.style.transition = '';
    //   target.value.style.willChange = '';
    // }
    if (animationFrameId) cancelAnimationFrame(animationFrameId); // If using rAF
  });

  // Return a computed style object for binding
  const magneticStyle = computed(() => ({
    transform: smoothTransform.value
  }))

  return {
    magneticStyle // Return the computed object
  }
}