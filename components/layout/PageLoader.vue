<template>
  <div class="page-loader-wrapper">
    <!-- Enhanced loading overlay -->
    <Transition name="loader" @after-leave="onLoaderHidden">
      <div v-if="isLoading" class="page-loader">
        <div class="loader-background">
          <div class="loader-gradient-1"></div>
          <div class="loader-gradient-2"></div>
          <div class="loader-gradient-3"></div>
        </div>
        <div class="loader-content">
          <div class="loader-logo-container">
            <div class="loader-logo-glow"></div>
            <img src="/profile-logo.svg" alt="Logo" class="loader-logo">
          </div>
          <div class="loader-text">
            <span class="loading-text">{{ loadingText }}</span>
          </div>
          <div class="loader-progress">
            <div class="progress-track">
              <div class="progress-bar" :style="{ width: `${progress}%` }">
                <div class="progress-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Page content with animation -->
    <div 
      v-show="!isLoading || isProjectPage"
      class="page-content"
      :class="{ 'content-ready': contentReady || isProjectPage }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { usePageReady } from '~/composables/usePageReady'
import { useRoute } from '#app'

const { setPageReady } = usePageReady()
const route = useRoute()

// Disable loader for project pages to fix display issue
const isProjectPage = computed(() => route.path.includes('/projects/'))
const isLoading = ref(!isProjectPage.value)
const progress = ref(0)
const contentReady = ref(isProjectPage.value)

const loadingTexts = [
  'Initializing...',
  'Loading assets...',
  'Preparing experience...',
  'Almost there...'
]

const loadingText = computed(() => {
  if (progress.value < 25) return loadingTexts[0]
  if (progress.value < 50) return loadingTexts[1]
  if (progress.value < 75) return loadingTexts[2]
  return loadingTexts[3]
})

const onLoaderHidden = () => {
  contentReady.value = true
  setPageReady(true)
}

onMounted(async () => {
  await nextTick()
  
  // If it's a project page, set everything as ready immediately
  if (isProjectPage.value) {
    isLoading.value = false
    contentReady.value = true
    progress.value = 100
    setPageReady(true)
    return
  }
  
  // Simulate progress while loading resources
  let currentProgress = 0
  const progressInterval = setInterval(() => {
    if (currentProgress < 90) {
      currentProgress += Math.random() * 15
      progress.value = Math.min(currentProgress, 90)
    }
  }, 200)
  
  const waitForResources = async () => {
    // Wait for document ready state
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true })
      })
    }
    
    // Wait for fonts
    if ('fonts' in document) {
      await document.fonts.ready
    }
    
    // Wait for critical images
    const images = Array.from(document.querySelectorAll('img'))
    const visibleImages = images.filter(img => {
      const rect = img.getBoundingClientRect()
      return rect.top < window.innerHeight * 1.5
    })
    
    await Promise.all(
      visibleImages.map(img => {
        if (img.complete && img.naturalHeight !== 0) {
          return Promise.resolve()
        }
        
        if (!img.src || img.src === '') {
          return Promise.resolve()
        }
        
        return new Promise(resolve => {
          const timeout = setTimeout(resolve, 3000)
          
          const cleanup = () => {
            clearTimeout(timeout)
            resolve()
          }
          
          img.addEventListener('load', cleanup, { once: true })
          img.addEventListener('error', cleanup, { once: true })
        })
      })
    )
    
    // Minimum loading time (shorter for project pages)
    const minLoadTime = isProjectPage.value ? 200 : 500
    await new Promise(resolve => setTimeout(resolve, minLoadTime))
  }
  
  const maxLoadTime = 3000
  const loadingTimeout = setTimeout(() => {
    console.warn('PageLoader: Force hiding loader after timeout')
    isLoading.value = false
  }, maxLoadTime)
  
  try {
    await waitForResources()
    clearInterval(progressInterval)
    
    // Animate to 100%
    const finalAnimation = () => {
      if (progress.value < 100) {
        progress.value = Math.min(progress.value + 5, 100)
        requestAnimationFrame(finalAnimation)
      } else {
        setTimeout(() => {
          isLoading.value = false
        }, 300)
      }
    }
    requestAnimationFrame(finalAnimation)
  } catch (error) {
    isLoading.value = false
  } finally {
    clearTimeout(loadingTimeout)
    clearInterval(progressInterval)
  }
})
</script>

<style scoped>
.page-loader-wrapper {
  position: relative;
  min-height: 100vh;
}

.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--base);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animated background */
.loader-background {
  @apply absolute inset-0 overflow-hidden;
}

.loader-gradient-1,
.loader-gradient-2,
.loader-gradient-3 {
  @apply absolute;
  opacity: 0.15;
}

.loader-gradient-1 {
  width: 300px;
  height: 300px;
  top: 20%;
  left: 10%;
  background: radial-gradient(circle at center, var(--mauve), transparent 60%);
  animation: gradientFloat 15s var(--ease-in-out) infinite;
  filter: blur(40px);
}

.loader-gradient-2 {
  width: 250px;
  height: 250px;
  bottom: 20%;
  right: 10%;
  background: radial-gradient(circle at center, var(--blue), transparent 60%);
  animation: gradientFloat 15s var(--ease-in-out) infinite reverse;
  animation-delay: 5s;
  filter: blur(40px);
}

.loader-gradient-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at center, var(--lavender), transparent 60%);
  animation: gradientPulse 10s var(--ease-in-out) infinite;
  filter: blur(50px);
}

@keyframes gradientFloat {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes gradientPulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.1;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.2;
  }
}

/* Content */
.loader-content {
  @apply relative z-10 text-center;
}

/* Logo with glow effect */
.loader-logo-container {
  @apply relative mb-8 inline-block;
}

.loader-logo {
  @apply w-16 h-16 relative z-10;
  animation: logoFloat 3s var(--ease-spring) infinite;
  filter: brightness(1.2) contrast(1.05);
  transform-origin: center;
}

.loader-logo-glow {
  @apply absolute inset-0 rounded-full;
  background: radial-gradient(circle, var(--mauve), transparent 60%);
  filter: blur(20px);
  animation: glowPulse 4s var(--ease-in-out) infinite;
  transform: scale(1.8);
  opacity: 0.4;
}

@keyframes logoFloat {
  0%, 100% { 
    transform: translateY(0) scale(1);
  }
  50% { 
    transform: translateY(-8px) scale(1.02);
  }
}

@keyframes glowPulse {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1.8);
  }
  50% { 
    opacity: 0.6; 
    transform: scale(2.2);
  }
}

/* Loading text */
.loader-text {
  @apply mb-6;
}

.loading-text {
  @apply text-subtext0 text-sm tracking-wider uppercase;
  animation: textFade var(--animation-base) var(--ease-out);
  letter-spacing: 0.2em;
}

@keyframes textFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Progress bar */
.loader-progress {
  @apply w-48 mx-auto;
}

.progress-track {
  @apply h-0.5 rounded-full overflow-hidden relative;
  background-color: rgba(var(--surface0-rgb, 49, 50, 68), 0.5);
}

.progress-bar {
  @apply h-full relative rounded-full;
  background: linear-gradient(90deg, var(--mauve), var(--blue), var(--lavender));
  background-size: 200% 100%;
  transition: width var(--animation-base) var(--ease-out);
  animation: progressGradient 2s linear infinite;
}

@keyframes progressGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.progress-glow {
  @apply absolute inset-0;
  background: inherit;
  filter: blur(4px);
  opacity: 0.5;
}

/* Transition animations */
.loader-enter-active {
  transition: opacity 0.3s ease;
}

.loader-leave-active {
  transition: opacity var(--animation-slow) var(--ease-out), 
              transform var(--animation-slow) var(--ease-spring);
}

.loader-enter-from {
  opacity: 0;
}

.loader-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Page content animation */
.page-content {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: all var(--animation-slower) var(--ease-out);
  will-change: opacity, transform;
}

.page-content.content-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>