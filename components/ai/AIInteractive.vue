<template>
  <section class="py-20 px-4 bg-mantle relative overflow-hidden">
    <!-- Particle Background -->
    <div class="absolute inset-0 opacity-30">
      <ParticleCanvas />
    </div>
    
    <div class="relative z-10 max-w-6xl mx-auto">
      <div class="animate-fade-in-up">
        <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink to-mauve">
          Démonstration interactive
        </h2>
      </div>
      
      <!-- Code Generation Demo -->
      <div class="grid md:grid-cols-2 gap-8">
        <div class="animate-fade-in-up animation-delay-100">
          <div class="bg-surface0/90 backdrop-blur-sm p-6 rounded-lg card-glow">
            <h3 class="text-2xl font-semibold mb-4 text-pink">Génération de code</h3>
            
            <!-- Language Selector -->
            <div class="flex gap-2 mb-4">
              <button
                v-for="lang in languages"
                :key="lang.id"
                @click="selectedLanguage = lang.id"
                :class="[
                  'px-3 py-1 rounded text-sm transition-all',
                  selectedLanguage === lang.id
                    ? 'bg-pink text-base'
                    : 'bg-surface1 text-text/70 hover:bg-surface2'
                ]"
              >
                {{ lang.name }}
              </button>
            </div>
            
            <div class="bg-base p-4 rounded-lg font-mono text-sm mb-4 min-h-[300px] relative overflow-hidden">
              <div class="text-green mb-2">// Prompt: {{ currentPrompt }}</div>
              <Transition name="code">
                <pre v-if="showCode" class="overflow-x-auto"><code v-html="highlightedCode" /></pre>
                <div v-else class="flex items-center justify-center h-full">
                  <div class="flex space-x-2">
                    <span class="w-2 h-2 bg-pink rounded-full animate-bounce" style="animation-delay: 0s" />
                    <span class="w-2 h-2 bg-mauve rounded-full animate-bounce" style="animation-delay: 0.1s" />
                    <span class="w-2 h-2 bg-lavender rounded-full animate-bounce" style="animation-delay: 0.2s" />
                  </div>
                </div>
              </Transition>
            </div>
            
            <div class="flex gap-3">
              <button
                @click="generateCode"
                :disabled="isGenerating"
                class="flex-1 px-6 py-2 bg-pink text-base rounded-lg hover:bg-pink/80 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-pink/25"
              >
                <Icon name="heroicons:sparkles" class="w-5 h-5 inline-block mr-2" />
                {{ isGenerating ? 'Génération...' : 'Générer' }}
              </button>
              <button
                @click="copyCode"
                :disabled="!showCode"
                class="px-6 py-2 bg-surface1 text-text rounded-lg hover:bg-surface2 transition-all duration-300 disabled:opacity-50"
              >
                <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Exemple d'utilisation -->
        <div class="animate-fade-in-up animation-delay-200">
          <div class="bg-surface0/90 backdrop-blur-sm p-6 rounded-lg">
            <h3 class="text-2xl font-semibold mb-4 text-lavender">Comment ça marche ?</h3>
            <ol class="space-y-3 text-text/80">
              <li class="flex items-start">
                <span class="text-pink mr-2">1.</span>
                Sélectionnez le langage de programmation souhaité
              </li>
              <li class="flex items-start">
                <span class="text-pink mr-2">2.</span>
                Cliquez sur "Générer" pour voir l'IA créer du code
              </li>
              <li class="flex items-start">
                <span class="text-pink mr-2">3.</span>
                Utilisez le bouton copier pour récupérer le code généré
              </li>
            </ol>
            <div class="mt-6 p-4 bg-base/50 rounded-lg border border-lavender/20">
              <p class="text-sm text-text/70">
                <Icon name="heroicons:light-bulb" class="w-5 h-5 inline-block mr-2 text-lavender" />
                L'IA génère du code basé sur des prompts contextuels. Chaque exemple illustre 
                comment un prompt simple peut produire du code fonctionnel et bien structuré.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="animate-fade-in-up animation-delay-300">
        <div class="mt-12 text-center">
          <p class="text-xl text-text/70">
            Cette démonstration illustre comment l'IA peut accélérer le développement 
            tout en maintenant le contrôle et la compréhension du code généré.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Code generation
const languages = [
  { id: 'js', name: 'JavaScript' },
  { id: 'py', name: 'Python' },
  { id: 'ts', name: 'TypeScript' },
  { id: 'vue', name: 'Vue' }
]
const selectedLanguage = ref('js')
const showCode = ref(false)
const isGenerating = ref(false)
const copied = ref(false)

const codeExamples = {
  js: {
    prompt: 'Créer une fonction de tri rapide',
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`
  },
  py: {
    prompt: 'Créer une fonction de tri rapide',
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[0]
    left = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]
    
    return quick_sort(left) + [pivot] + quick_sort(right)`
  },
  ts: {
    prompt: 'Créer une fonction de tri rapide générique',
    code: `function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`
  },
  vue: {
    prompt: 'Créer un composant de compteur',
    code: `&lt;template&gt;
  &lt;div class="counter"&gt;
    &lt;button @click="decrement"&gt;-&lt;/button&gt;
    &lt;span&gt;{{ count }}&lt;/span&gt;
    &lt;button @click="increment"&gt;+&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const count = ref(0)
const increment = () =&gt; count.value++
const decrement = () =&gt; count.value--
&lt;/script&gt;`
  }
}

const currentPrompt = computed(() => codeExamples[selectedLanguage.value].prompt)
const highlightedCode = computed(() => {
  const code = codeExamples[selectedLanguage.value].code
  // Simple syntax highlighting
  return code
    .replace(/\b(function|const|let|var|if|return|import|from|def|class)\b/g, '<span class="text-mauve">$1</span>')
    .replace(/\b(true|false|null|undefined|None|True|False)\b/g, '<span class="text-peach">$1</span>')
    .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-overlay1">$&</span>')
    .replace(/\b\d+\b/g, '<span class="text-peach">$&</span>')
})

const generateCode = async () => {
  isGenerating.value = true
  showCode.value = false
  await new Promise(resolve => setTimeout(resolve, 1500))
  showCode.value = true
  isGenerating.value = false
}

const copyCode = async () => {
  const code = codeExamples[selectedLanguage.value].code
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<style scoped>
.code-enter-active,
.code-leave-active {
  transition: all 0.5s ease;
}

.code-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.code-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>