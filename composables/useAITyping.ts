import { ref, computed } from 'vue'

export const useAITyping = (text: string, speed = 50) => {
  const displayedText = ref('')
  const currentIndex = ref(0)
  const isTyping = ref(false)
  const isPaused = ref(false)
  
  const words = text.split(' ')
  const wordDelays = words.map(() => Math.random() * 200 + 100)
  
  const progress = computed(() => {
    return text.length > 0 ? (currentIndex.value / text.length) * 100 : 0
  })
  
  const type = async () => {
    if (isTyping.value) return
    
    isTyping.value = true
    displayedText.value = ''
    currentIndex.value = 0
    
    let wordIndex = 0
    let charInWordIndex = 0
    
    while (currentIndex.value < text.length && !isPaused.value) {
      const currentChar = text[currentIndex.value]
      displayedText.value += currentChar
      currentIndex.value++
      
      if (currentChar === ' ') {
        await new Promise(resolve => setTimeout(resolve, wordDelays[wordIndex]))
        wordIndex++
        charInWordIndex = 0
      } else {
        charInWordIndex++
        const charDelay = speed + (Math.random() * 30 - 15)
        
        if (charInWordIndex === 1) {
          await new Promise(resolve => setTimeout(resolve, charDelay * 2))
        } else {
          await new Promise(resolve => setTimeout(resolve, charDelay))
        }
      }
      
      if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
        await new Promise(resolve => setTimeout(resolve, 300))
      } else if (currentChar === ',') {
        await new Promise(resolve => setTimeout(resolve, 150))
      }
    }
    
    isTyping.value = false
  }
  
  const pause = () => {
    isPaused.value = true
  }
  
  const resume = () => {
    isPaused.value = false
    if (!isTyping.value) {
      type()
    }
  }
  
  const reset = () => {
    displayedText.value = ''
    currentIndex.value = 0
    isTyping.value = false
    isPaused.value = false
  }
  
  const complete = () => {
    displayedText.value = text
    currentIndex.value = text.length
    isTyping.value = false
    isPaused.value = false
  }
  
  return {
    displayedText,
    isTyping,
    isPaused,
    progress,
    type,
    pause,
    resume,
    reset,
    complete
  }
}