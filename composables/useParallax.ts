import { ref, onMounted, onUnmounted, type Ref } from 'vue';

interface ParallaxOptions {
  speed?: number;  // Parallax speed factor
  offset?: number;  // Offset from viewport
  axis?: 'y' | 'x' | 'both';  // Parallax axis
  smooth?: boolean;  // Enable smooth scrolling
}

export function useParallax(
  elementRef: Ref<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    offset = 0,
    axis = 'y',
    smooth = true
  } = options;

  const transform = ref('');
  let ticking = false;
  let lastScrollY = 0;
  let lastScrollX = 0;

  const updateTransform = () => {
    if (!elementRef.value) return;

    const rect = elementRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate element's position relative to viewport center
    const elementCenterY = rect.top + rect.height / 2;
    const elementCenterX = rect.left + rect.width / 2;
    
    // Calculate distance from viewport center
    const distanceY = elementCenterY - windowHeight / 2;
    const distanceX = elementCenterX - windowWidth / 2;
    
    // Apply parallax effect
    let translateY = 0;
    let translateX = 0;
    
    if (axis === 'y' || axis === 'both') {
      translateY = distanceY * speed + offset;
    }
    
    if (axis === 'x' || axis === 'both') {
      translateX = distanceX * speed;
    }
    
    // Smooth interpolation
    if (smooth) {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      const scrollVelocityY = currentScrollY - lastScrollY;
      const scrollVelocityX = currentScrollX - lastScrollX;
      
      translateY += scrollVelocityY * speed * 0.1;
      translateX += scrollVelocityX * speed * 0.1;
      
      lastScrollY = currentScrollY;
      lastScrollX = currentScrollX;
    }
    
    // Apply transform
    if (axis === 'both') {
      transform.value = `translate3d(${translateX}px, ${translateY}px, 0)`;
    } else if (axis === 'x') {
      transform.value = `translateX(${translateX}px)`;
    } else {
      transform.value = `translateY(${translateY}px)`;
    }
    
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateTransform);
      ticking = true;
    }
  };

  const handleScroll = () => {
    requestTick();
  };

  const handleResize = () => {
    requestTick();
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    updateTransform();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
  });

  return {
    transform
  };
}

// Hook for multiple parallax layers
export function useParallaxLayers() {
  const layers = ref<Array<{
    id: string;
    speed: number;
    element?: HTMLElement;
    transform?: string;
  }>>([]);

  const addLayer = (id: string, speed: number, element: HTMLElement) => {
    layers.value.push({ id, speed, element });
  };

  const removeLayer = (id: string) => {
    layers.value = layers.value.filter(layer => layer.id !== id);
  };

  const updateLayers = () => {
    const scrollY = window.scrollY;
    
    layers.value.forEach(layer => {
      if (layer.element) {
        const speed = layer.speed;
        const yPos = -(scrollY * speed);
        layer.transform = `translateY(${yPos}px)`;
        layer.element.style.transform = layer.transform;
      }
    });
  };

  let ticking = false;
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateLayers();
        ticking = false;
      });
      ticking = true;
    }
  };

  const handleScroll = () => {
    requestTick();
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    layers,
    addLayer,
    removeLayer
  };
}