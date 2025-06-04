<template>
  <div class="md:w-7/12 space-y-gap-md">
    <h1 class="font-bold leading-tight hero-animate-item !text-5xl sm:!text-6xl md:!text-5xl lg:!text-6xl mb-4 text-text">
      <span class="gradient-text gradient-animate typing-text block sm:inline" ref="titleRef">{{ displayedTitle }}</span>
      <span class="typing-cursor" v-if="isTyping">|</span>
    </h1>
    <h2 class="!text-lg sm:!text-xl md:!text-2xl font-medium text-subtext0 mb-6 hero-animate-item hero-delay-1 px-4 sm:px-0">
      {{ subtitle }}
    </h2>
    <p class="text-base sm:text-lg mb-8 max-w-2xl hero-animate-item hero-delay-2 px-4 sm:px-0 leading-relaxed text-subtext0">
      {{ description }}
    </p>
    <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4 hero-animate-item hero-delay-3 mt-12 mb-16 sm:mb-0">
      <Button 
        :to="primaryButton.to" 
        variant="solid" 
        color="mauve" 
        :iconRight="primaryButton.iconRight"
        class="ripple-button w-full sm:w-auto px-8 py-3 text-base"
        @click="createRipple"
        :aria-label="`${primaryButton.text} - Accéder à la page des projets`"
      >
        {{ primaryButton.text }}
      </Button>
      <Button 
        v-if="secondaryButton" 
        :to="secondaryButton.to" 
        variant="outline"
        class="ripple-button w-full sm:w-auto px-8 py-3 text-base"
        @click="createRipple"
        :aria-label="`${secondaryButton.text} - Navigation secondaire`"
      >
        {{ secondaryButton.text }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface HeroContentProps {
  title: string
  subtitle: string
  description: string
  primaryButton: {
    to: string
    text: string
    iconRight?: string
  }
  secondaryButton?: {
    to: string
    text: string
  }
}

const props = defineProps<HeroContentProps>()

const titleRef = ref<HTMLElement>()

// Typing animation state
const displayedTitle = ref('')
const isTyping = ref(true)
const typingSpeed = 100

// Typing animation
const startTypingAnimation = async () => {
  if (!props.title) return
  
  displayedTitle.value = ''
  isTyping.value = true
  
  for (let i = 0; i <= props.title.length; i++) {
    displayedTitle.value = props.title.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, typingSpeed))
  }
  
  // Blink cursor a few times then hide
  setTimeout(() => {
    isTyping.value = false
  }, 1000)
}

// Ripple effect for buttons
const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const ripple = document.createElement('span')
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  ripple.classList.add('ripple')
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  
  button.appendChild(ripple)
  
  setTimeout(() => {
    ripple.remove()
  }, 600)
}

onMounted(async () => {
  // Start typing animation after a short delay
  await nextTick()
  setTimeout(() => {
    startTypingAnimation()
  }, 500)
})
</script>

<style scoped>
/* Hero animations - triggered when page is ready */
.hero-animate-item {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  animation: heroFadeInUp var(--animation-slower) var(--ease-out) forwards;
}

@keyframes heroFadeInUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Stagger delays for sequential animation */
.hero-delay-1 { animation-delay: 0.1s; }
.hero-delay-2 { animation-delay: 0.2s; }
.hero-delay-3 { animation-delay: 0.3s; }

/* Animated gradient text */
.gradient-animate {
  background: linear-gradient(
    -45deg,
    var(--mauve),
    var(--blue),
    var(--lavender),
    var(--peach),
    var(--yellow),
    var(--green),
    var(--teal),
    var(--sapphire),
    var(--mauve)
  );
  background-size: 300% 300%;
  animation: gradientShift 8s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Typing animation styles */
.typing-text {
  display: inline-block;
}

.typing-cursor {
  display: inline-block;
  background-color: #cdd6f4;
  width: 2px;
  margin-left: 2px;
  animation: typingBlink 1s infinite;
}

@keyframes typingBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Button ripple effect */
.ripple-button {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ripple-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.ripple-button:active {
  transform: translateY(0) scale(0.98);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transform: scale(0);
  animation: rippleAnimation 1.2s ease-out;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

@keyframes rippleAnimation {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  /* Add mobile-specific gradient animation */
  @keyframes mobileGradientShift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 50% 0%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 100%; }
  }
  
  .gradient-animate {
    animation: mobileGradientShift 10s ease-in-out infinite;
    background-size: 200% 200%;
    animation-duration: 6s;
  }
  
  .typing-cursor {
    width: 3px;
    height: 1.2em;
  }
  
  /* Improve button touch targets */
  .ripple-button {
    min-height: 48px;
    touch-action: manipulation;
  }
  
  .ripple-button:hover {
    transform: none;
    box-shadow: none;
  }
  
  /* Stagger delays adjusted for mobile */
  .hero-delay-1 { animation-delay: 0.05s; }
  .hero-delay-2 { animation-delay: 0.1s; }
  .hero-delay-3 { animation-delay: 0.15s; }
  
  /* Faster animations on mobile */
  .hero-animate-item {
    animation-duration: 0.6s;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .gradient-animate {
    animation: none;
  }
  
  .ripple-button {
    transition: none;
    transform: none;
  }
}
</style>