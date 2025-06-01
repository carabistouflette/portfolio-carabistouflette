/**
 * Composable pour gérer le chargement optimisé des ressources
 */
export const useResourceLoading = () => {
  const isLoading = ref(true);
  const isReady = ref(false);
  const loadedResources = ref(new Set<string>());

  /**
   * Marque une ressource comme chargée
   */
  const markResourceLoaded = (resourceId: string) => {
    loadedResources.value.add(resourceId);
  };

  /**
   * Vérifie si toutes les ressources critiques sont chargées
   */
  const checkCriticalResourcesLoaded = (criticalResources: string[]) => {
    return criticalResources.every(resource => loadedResources.value.has(resource));
  };

  /**
   * Initialise l'état de chargement des ressources critiques
   */
  const initResourceLoading = (criticalResources: string[]) => {
    isLoading.value = true;
    isReady.value = false;

    // Observer les ressources critiques
    const checkInterval = setInterval(() => {
      if (checkCriticalResourcesLoaded(criticalResources)) {
        isLoading.value = false;
        isReady.value = true;
        clearInterval(checkInterval);
      }
    }, 100);

    // Timeout de sécurité
    setTimeout(() => {
      isLoading.value = false;
      isReady.value = true;
      clearInterval(checkInterval);
    }, 5000);
  };

  /**
   * Précharge une image de manière optimisée
   */
  const preloadImage = (src: string, options: { priority?: boolean } = {}) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      if (options.priority) {
        img.loading = 'eager';
      }

      img.onload = () => {
        markResourceLoaded(src);
        resolve();
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  };

  /**
   * Précharge plusieurs images en parallèle
   */
  const preloadImages = async (images: Array<{ src: string; priority?: boolean }>) => {
    const promises = images.map(({ src, priority }) => 
      preloadImage(src, { priority }).catch(err => {
        console.warn(`Image preload failed for ${src}:`, err);
      })
    );

    await Promise.allSettled(promises);
  };

  return {
    // État
    isLoading: readonly(isLoading),
    isReady: readonly(isReady),
    loadedResources: readonly(loadedResources),

    // Méthodes
    markResourceLoaded,
    checkCriticalResourcesLoaded,
    initResourceLoading,
    preloadImage,
    preloadImages
  };
};