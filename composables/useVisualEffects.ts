import { ref, onMounted, onUnmounted } from 'vue'

export function useVisualEffects() {
  const mousePosition = ref({ x: 0, y: 0 })
  
  // Suivi de la position de la souris pour les effets magnétiques
  const updateMousePosition = (event: MouseEvent) => {
    mousePosition.value = {
      x: event.clientX,
      y: event.clientY
    }
  }
  
  // Effet magnétique pour les éléments
  const applyMagneticEffect = (element: HTMLElement, strength: number = 1) => {
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength * 0.1
      const deltaY = (e.clientY - centerY) * strength * 0.1
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }
    
    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)'
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
  
  // Effet de parallaxe amélioré
  const applyParallaxEffect = (elements: HTMLElement[], speeds: number[] = [0.5]) => {
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      
      elements.forEach((element, index) => {
        const speed = speeds[index] || speeds[0] || 0.5
        const yPos = scrolled * speed
        element.style.transform = `translateY(${yPos}px)`
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }
  
  // Effet de morphing avancé
  const applyMorphingEffect = (element: HTMLElement) => {
    
    const handleMouseEnter = () => {
      element.style.borderRadius = '24px'
      element.style.transform = 'scale(1.02) rotate(1deg)'
    }
    
    const handleMouseLeave = () => {
      element.style.borderRadius = '16px'
      element.style.transform = 'scale(1) rotate(0deg)'
    }
    
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
  
  // Effet de particules flottantes
  const createFloatingParticles = (container: HTMLElement, count: number = 10) => {
    
    const particles: HTMLElement[] = []
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'floating-particle'
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        background: radial-gradient(circle, rgba(203, 166, 247, 0.6), transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${10 + Math.random() * 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `
      
      container.appendChild(particle)
      particles.push(particle)
    }
    
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }
  
  // Animation de révélation en cascade
  const applyCascadeReveal = (elements: HTMLElement[], delay: number = 100) => {
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          const index = elements.indexOf(element)
          
          setTimeout(() => {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0) scale(1)'
          }, index * delay)
          
          observer.unobserve(element)
        }
      })
    }, { threshold: 0.1 })
    
    elements.forEach((element) => {
      element.style.opacity = '0'
      element.style.transform = 'translateY(30px) scale(0.95)'
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      observer.observe(element)
    })
    
    return () => observer.disconnect()
  }
  
  // Effet de brillance sur survol
  const applyShineEffect = (element: HTMLElement) => {
    
    const shine = document.createElement('div')
    shine.className = 'shine-overlay'
    shine.style.cssText = `
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 70%
      );
      transform: rotate(45deg) translate(-100%, -100%);
      transition: transform 0.6s ease;
      pointer-events: none;
      opacity: 0;
    `
    
    element.style.position = 'relative'
    element.style.overflow = 'hidden'
    element.appendChild(shine)
    
    const handleMouseEnter = () => {
      shine.style.opacity = '1'
      shine.style.transform = 'rotate(45deg) translate(100%, 100%)'
    }
    
    const handleMouseLeave = () => {
      shine.style.opacity = '0'
      shine.style.transform = 'rotate(45deg) translate(-100%, -100%)'
    }
    
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (shine.parentNode) {
        shine.parentNode.removeChild(shine)
      }
    }
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true })
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
  })
  
  return {
    mousePosition,
    applyMagneticEffect,
    applyParallaxEffect,
    applyMorphingEffect,
    createFloatingParticles,
    applyCascadeReveal,
    applyShineEffect
  }
}