<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md bg-base/80 border-b border-surface0 transition-all duration-300"
    :class="{ 'shadow-md': scrolled }"
  >
    <div class="container-custom py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2 group">
        <div class="w-10 h-10 rounded-full bg-mauve text-base flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
          AR
        </div>
        <span class="font-bold text-xl hidden sm:block">Alexis Robin</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <TheNavigation />
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-text p-2 rounded-lg hover:bg-surface0 transition-colors"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <NuxtIcon
          :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
          class="w-6 h-6"
        />
      </button>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-base/95 backdrop-blur-lg border-b border-surface0 shadow-lg"
      >
        <div class="container-custom py-4">
          <TheNavigation mobile @navigate="closeMobileMenu" />
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import TheNavigation from './TheNavigation.vue'
// Header state
const scrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Scroll handler
const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>