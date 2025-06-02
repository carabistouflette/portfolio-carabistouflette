import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

export const useInvertedScroll = () => {
  const scrollY = ref(0)
  const windowHeight = ref(0)
  const containerRef = ref<HTMLElement | null>(null)
  const sectionTop = ref(0)
  const sectionHeight = ref(0)
  const isInView = ref(false)
  
  // Handler de scroll avec logique inversée pour section
  const handleScroll = () => {
    if (!containerRef.value) return
    
    scrollY.value = window.scrollY
    windowHeight.value = window.innerHeight
    
    // Obtenir la position de la section
    const rect = containerRef.value.getBoundingClientRect()
    sectionTop.value = rect.top + scrollY.value
    sectionHeight.value = containerRef.value.scrollHeight
    
    // Vérifier si la section est visible
    const scrollBottom = scrollY.value + windowHeight.value
    isInView.value = scrollBottom > sectionTop.value && scrollY.value < sectionTop.value + sectionHeight.value
  }
  
  // Transform du conteneur pour créer l'effet de scroll inversé dans la section
  const containerTransform = computed(() => {
    if (!isInView.value || !containerRef.value) return 'translateY(0)'
    
    // Position relative dans la section
    const relativeScroll = scrollY.value - sectionTop.value
    const maxScroll = sectionHeight.value - windowHeight.value
    
    // Limiter l'effet à la hauteur de la section
    const progress = Math.max(0, Math.min(1, relativeScroll / maxScroll))
    
    // Effet inversé : le contenu monte quand on descend
    const invertedY = progress * maxScroll * 0.3 // 0.3 pour un effet plus subtil
    
    return `translateY(${-invertedY}px)`
  })
  
  // Progrès du scroll (0 = début, 1 = fin)
  const scrollProgress = computed(() => {
    if (!sectionHeight.value || !windowHeight.value) return 0
    const relativeScroll = scrollY.value - sectionTop.value
    const maxScroll = sectionHeight.value - windowHeight.value
    return Math.max(0, Math.min(1, relativeScroll / maxScroll))
  })
  
  // Fonction pour initialiser le scroll inversé
  const initInvertedScroll = (element: HTMLElement) => {
    containerRef.value = element
    
    // Configurer le conteneur pour l'effet
    if (element) {
      element.style.willChange = 'transform'
      element.style.transition = 'transform 0.1s ease-out'
    }
    
    // Initialiser les valeurs
    handleScroll()
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })
  
  return {
    scrollY,
    scrollProgress,
    containerTransform,
    initInvertedScroll,
    containerRef
  }
}