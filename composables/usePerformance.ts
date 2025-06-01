/**
 * Composable pour gérer les optimisations de performance et d'accessibilité
 */
export const usePerformance = () => {
  const prefersReducedMotion = ref(false);
  const isMobile = ref(false);
  const isLowPerformanceDevice = ref(false);
  const connectionSpeed = ref<'slow' | 'fast'>('fast');

  /**
   * Détecte les capacités de l'appareil et les préférences utilisateur
   */
  const detectDeviceCapabilities = () => {
    if (typeof window === 'undefined') return;

    // Préférence de mouvement réduit
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Détection d'appareil mobile
    isMobile.value = window.innerWidth <= 768 || 
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Détection d'appareil bas de gamme
    isLowPerformanceDevice.value = navigator.hardwareConcurrency <= 2 || isMobile.value;
    
    // Détection de la vitesse de connexion
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      connectionSpeed.value = connection?.effectiveType === '4g' || connection?.effectiveType === '5g' ? 'fast' : 'slow';
    }
  };

  /**
   * Écoute les changements de préférences
   */
  const setupMotionListener = () => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      prefersReducedMotion.value = e.matches;
    });
  };

  /**
   * Détermine si les animations doivent être activées
   */
  const shouldAnimate = computed(() => {
    return !prefersReducedMotion.value && !isLowPerformanceDevice.value;
  });

  /**
   * Détermine si les particules doivent être affichées
   */
  const shouldShowParticles = computed(() => {
    return shouldAnimate.value && connectionSpeed.value === 'fast';
  });

  /**
   * Retourne le nombre optimal de particules selon l'appareil
   */
  const getOptimalParticleCount = () => {
    if (!shouldShowParticles.value) return 0;
    if (isMobile.value) return 8;
    if (isLowPerformanceDevice.value) return 12;
    return 20;
  };

  /**
   * Retourne la fréquence d'animation optimale
   */
  const getAnimationSmoothness = () => {
    if (isMobile.value || isLowPerformanceDevice.value) return 0.01;
    return 0.02;
  };

  return {
    // État
    prefersReducedMotion: readonly(prefersReducedMotion),
    isMobile: readonly(isMobile),
    isLowPerformanceDevice: readonly(isLowPerformanceDevice),
    connectionSpeed: readonly(connectionSpeed),
    
    // Computed
    shouldAnimate,
    shouldShowParticles,
    
    // Méthodes
    detectDeviceCapabilities,
    setupMotionListener,
    getOptimalParticleCount,
    getAnimationSmoothness
  };
};