<template>
  <div class="page-loader-wrapper">
    <!-- Loading overlay -->
    <Transition name="fade" @after-leave="onLoaderHidden">
      <div v-if="isLoading" class="page-loader">
        <div class="loader-content">
          <div class="loader-spinner">
            <div class="spinner-ring"></div>
          </div>
          <p class="loader-text">Chargement...</p>
        </div>
      </div>
    </Transition>
    
    <!-- Page content -->
    <div 
      v-show="!isLoading"
      class="page-content"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const isLoading = ref(true)

const onLoaderHidden = () => {
  console.log('[PageLoader] Loader transition completed')
}

onMounted(async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  
  // Add debugging info
  console.log('[PageLoader] Starting resource loading...')
  
  // Wait for critical resources
  const waitForResources = async () => {
    // Wait for document ready state
    if (document.readyState !== 'complete') {
      console.log('[PageLoader] Waiting for document complete state...')
      await new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true })
      })
    }
    console.log('[PageLoader] Document ready state:', document.readyState)
    
    // Wait for fonts
    if ('fonts' in document) {
      console.log('[PageLoader] Waiting for fonts...')
      await document.fonts.ready
      console.log('[PageLoader] Fonts loaded')
    }
    
    // Wait for all images in viewport
    const images = Array.from(document.querySelectorAll('img'))
    console.log(`[PageLoader] Found ${images.length} images total`)
    
    const visibleImages = images.filter(img => {
      const rect = img.getBoundingClientRect()
      return rect.top < window.innerHeight * 1.5 // Load images slightly below fold too
    })
    console.log(`[PageLoader] ${visibleImages.length} images in viewport to load`)
    
    await Promise.all(
      visibleImages.map(img => {
        // If image is already complete and loaded successfully, resolve immediately
        if (img.complete && img.naturalHeight !== 0) {
          return Promise.resolve()
        }
        
        // If image has no src or is empty, resolve immediately
        if (!img.src || img.src === '') {
          return Promise.resolve()
        }
        
        // Otherwise wait for load or error event
        return new Promise(resolve => {
          // Set a timeout to prevent infinite waiting
          const timeout = setTimeout(() => {
            console.warn(`Image load timeout: ${img.src}`)
            resolve()
          }, 5000) // 5 second timeout
          
          const cleanup = () => {
            clearTimeout(timeout)
            resolve()
          }
          
          img.addEventListener('load', cleanup, { once: true })
          img.addEventListener('error', cleanup, { once: true })
        })
      })
    )
    
    // Minimum loading time to prevent flash
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  // Set a maximum timeout to prevent infinite loading
  const maxLoadTime = 10000 // 10 seconds
  const loadingTimeout = setTimeout(() => {
    console.warn('[PageLoader] Maximum load time exceeded, forcing loader to hide')
    isLoading.value = false
  }, maxLoadTime)
  
  try {
    await waitForResources()
    console.log('[PageLoader] All resources loaded successfully')
  } catch (error) {
    console.error('[PageLoader] Error loading resources:', error)
  } finally {
    clearTimeout(loadingTimeout)
    console.log('[PageLoader] Hiding loader')
    isLoading.value = false
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
  background: var(--ctp-base);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  text-align: center;
}

.loader-spinner {
  margin: 0 auto 1rem;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  width: 100%;
  height: 100%;
  border: 4px solid var(--ctp-surface0);
  border-top-color: var(--ctp-mauve);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader-text {
  color: var(--ctp-subtext0);
  font-size: 0.875rem;
  margin: 0;
}

/* Remove opacity transitions - using v-show instead */

/* Fade transition for loader */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>