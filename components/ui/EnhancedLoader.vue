<template>
  <div class="enhanced-loader-container" :class="{ 'is-loading': loading }">
    <div v-if="loading" class="enhanced-loader-overlay">
      <div class="loader-content">
        <!-- Loader principal sophistiqué -->
        <div class="sophisticated-loader">
          <div class="loader-ring ring-1"></div>
          <div class="loader-ring ring-2"></div>
          <div class="loader-ring ring-3"></div>
          <div class="loader-center">
            <div class="loader-dot"></div>
          </div>
        </div>
        
        <!-- Texte de chargement avec effet de typing -->
        <div class="loader-text">
          <span class="typing-text">{{ displayedText }}</span>
          <span class="typing-cursor" v-if="showCursor">|</span>
        </div>
        
        <!-- Particules flottantes -->
        <div class="loader-particles">
          <div
            v-for="i in 12"
            :key="i"
            class="loader-particle"
            :style="{
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (2 + Math.random() * 2) + 's'
            }"
          ></div>
        </div>
        
        <!-- Barre de progression stylisée -->
        <div v-if="showProgress" class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <div class="progress-glow"></div>
          </div>
          <span class="progress-text">{{ Math.round(progress) }}%</span>
        </div>
      </div>
    </div>
    
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  loading?: boolean
  text?: string
  showProgress?: boolean
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  text: 'Chargement en cours...',
  showProgress: false,
  progress: 0
})

const displayedText = ref('')
const showCursor = ref(true)
const typingSpeed = 100

let typingInterval: ReturnType<typeof setInterval> | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

const startTypingAnimation = () => {
  displayedText.value = ''
  let currentIndex = 0
  const fullText = props.text
  
  typingInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      displayedText.value += fullText[currentIndex]
      currentIndex++
    } else {
      if (typingInterval) {
        clearInterval(typingInterval)
        typingInterval = null
      }
    }
  }, typingSpeed)
}

const startCursorAnimation = () => {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

const stopAnimations = () => {
  if (typingInterval) {
    clearInterval(typingInterval)
    typingInterval = null
  }
  if (cursorInterval) {
    clearInterval(cursorInterval)
    cursorInterval = null
  }
}

watch(() => props.loading, (newLoading) => {
  if (newLoading) {
    startTypingAnimation()
    startCursorAnimation()
  } else {
    stopAnimations()
  }
})

onMounted(() => {
  if (props.loading) {
    startTypingAnimation()
    startCursorAnimation()
  }
})

onUnmounted(() => {
  stopAnimations()
})
</script>

<style scoped>
.enhanced-loader-container {
  position: relative;
}

.enhanced-loader-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(var(--base-rgb), 0.95) 0%,
    rgba(var(--mantle-rgb), 0.98) 50%,
    rgba(var(--base-rgb), 0.95) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

/* Loader sophistiqué */
.sophisticated-loader {
  position: relative;
  width: 120px;
  height: 120px;
}

.loader-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
}

.ring-1 {
  border-top-color: var(--mauve);
  animation: sophisticatedSpin 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.ring-2 {
  border-right-color: var(--pink);
  animation: sophisticatedSpin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
  transform: scale(0.8);
}

.ring-3 {
  border-bottom-color: var(--blue);
  animation: sophisticatedSpin 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  transform: scale(0.6);
}

.loader-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader-dot {
  width: 16px;
  height: 16px;
  background: radial-gradient(circle, var(--lavender), var(--mauve));
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(var(--mauve-rgb), 0.5);
}

@keyframes sophisticatedSpin {
  0% {
    transform: rotate(0deg) scale(1);
    border-width: 2px;
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    border-width: 4px;
  }
  100% {
    transform: rotate(360deg) scale(1);
    border-width: 2px;
  }
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

/* Texte avec effet typing */
.loader-text {
  font-size: 1.125rem;
  color: var(--text);
  font-weight: 500;
  min-height: 1.5rem;
}

.typing-text {
  display: inline-block;
}

.typing-cursor {
  display: inline-block;
  background-color: var(--mauve);
  width: 2px;
  margin-left: 2px;
  animation: cursorBlink 1s infinite;
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Particules flottantes */
.loader-particles {
  position: absolute;
  inset: -50px;
  pointer-events: none;
}

.loader-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, var(--mauve), transparent);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Barre de progression */
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 200px;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(var(--surface1-rgb), 0.5);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--mauve), var(--pink), var(--blue));
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: progressGlow 2s ease-in-out infinite;
}

@keyframes progressGlow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  font-size: 0.875rem;
  color: var(--subtext1);
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(20px);
  }
}

</style>