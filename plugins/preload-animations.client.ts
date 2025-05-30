export default defineNuxtPlugin(() => {
  // Force style recalculation on initial load to prevent FOUC
  if (process.client) {
    // Add a class to body to indicate animations are ready
    document.documentElement.classList.add('animations-ready')
    
    // Force a reflow to ensure styles are applied before animations start
    void document.documentElement.offsetHeight
  }
})