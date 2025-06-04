<template>
  <section class="py-20 px-4 bg-mantle relative overflow-hidden">
    <!-- Particle Background -->
    <div class="absolute inset-0 opacity-30">
      <ParticleCanvas />
    </div>
    
    <div class="relative z-10 max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink to-mauve">
        Démonstration interactive
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Code Generation Demo -->
        <div class="bg-surface0/90 backdrop-blur-sm p-6 rounded-lg card-glow">
          <h3 class="text-2xl font-semibold mb-4 text-pink">Génération de code</h3>
          <div class="bg-base p-4 rounded-lg font-mono text-sm mb-4 min-h-[200px]">
            <div class="text-green mb-2">// Prompt: Créer une fonction de tri</div>
            <Transition name="code">
              <div v-if="showCode" class="space-y-1">
                <div><span class="text-mauve">function</span> <span class="text-blue">quickSort</span>(<span class="text-peach">arr</span>) {</div>
                <div class="ml-4"><span class="text-mauve">if</span> (arr.length &lt;= <span class="text-peach">1</span>) <span class="text-mauve">return</span> arr;</div>
                <div class="ml-4"><span class="text-mauve">const</span> pivot = arr[<span class="text-peach">0</span>];</div>
                <div class="ml-4"><span class="text-mauve">const</span> left = arr.slice(<span class="text-peach">1</span>).filter(x =&gt; x &lt; pivot);</div>
                <div class="ml-4"><span class="text-mauve">const</span> right = arr.slice(<span class="text-peach">1</span>).filter(x =&gt; x &gt;= pivot);</div>
                <div class="ml-4"><span class="text-mauve">return</span> [...<span class="text-blue">quickSort</span>(left), pivot, ...<span class="text-blue">quickSort</span>(right)];</div>
                <div>}</div>
              </div>
              <span v-else class="text-overlay1 animate-pulse">|</span>
            </Transition>
          </div>
          <button
            @click="generateCode"
            :disabled="isGenerating"
            class="px-6 py-2 bg-pink text-base rounded-lg hover:bg-pink/80 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-pink/25"
          >
            {{ isGenerating ? 'Génération...' : 'Générer le code' }}
          </button>
        </div>
        
        <!-- AI Chat Demo -->
        <div class="bg-surface0/90 backdrop-blur-sm p-6 rounded-lg card-glow">
          <h3 class="text-2xl font-semibold mb-4 text-mauve">Assistant IA</h3>
          <div class="bg-base p-4 rounded-lg mb-4 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-overlay0 scrollbar-track-base">
            <TransitionGroup name="message">
              <div v-for="(message, index) in messages" :key="index" class="mb-2">
                <div :class="message.role === 'user' ? 'text-blue' : 'text-green'">
                  {{ message.role === 'user' ? 'Vous: ' : 'IA: ' }}
                  <span class="text-text/80">{{ message.content }}</span>
                </div>
              </div>
            </TransitionGroup>
            <div v-if="isTyping" class="text-green">
              IA: <span class="text-overlay1 animate-pulse">...</span>
            </div>
          </div>
          <button
            @click="askAI"
            :disabled="isTyping"
            class="px-6 py-2 bg-mauve text-base rounded-lg hover:bg-mauve/80 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-mauve/25"
          >
            Poser une question
          </button>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <p class="text-xl text-text/70">
          Ces exemples illustrent comment l'IA peut accélérer le développement 
          tout en maintenant le contrôle et la compréhension du code généré.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCode = ref(false)
const isGenerating = ref(false)
const messages = ref([
  { role: 'user', content: 'Comment optimiser une requête SQL?' },
  { role: 'ai', content: 'Pour optimiser une requête SQL, utilisez des index sur les colonnes de jointure et de filtrage.' }
])
const isTyping = ref(false)

const generateCode = async () => {
  isGenerating.value = true
  showCode.value = false
  await new Promise(resolve => setTimeout(resolve, 1000))
  showCode.value = true
  isGenerating.value = false
}

const askAI = async () => {
  messages.value.push({ role: 'user', content: 'Quelle est la différence entre let et const?' })
  isTyping.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  messages.value.push({ 
    role: 'ai', 
    content: 'const définit une référence constante qui ne peut pas être réassignée, tandis que let permet la réassignation.' 
  })
  isTyping.value = false
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

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>