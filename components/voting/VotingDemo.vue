<template>
  <section ref="demoSection" class="py-20 px-6 bg-mantle">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-6">Démonstration Live</h2>
        <p class="text-xl text-subtext0 max-w-3xl mx-auto">
          Simulez le processus complet de vote électronique sécurisé
        </p>
      </div>
      
      <div class="bg-base rounded-3xl p-8 border border-surface1">
        <!-- Progress Steps -->
        <div class="flex items-center justify-between mb-12 overflow-x-auto">
          <div v-for="(stepLabel, index) in steps" :key="index"
            class="flex items-center"
            :class="{ 'opacity-50': currentStep < index }">
            <div class="flex flex-col items-center min-w-[100px]">
              <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all"
                :class="currentStep >= index ? 'bg-pink text-white' : 'bg-surface1 text-overlay0'">
                <Icon v-if="currentStep > index" name="heroicons:check" class="w-6 h-6" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span class="text-sm text-center">{{ stepLabel }}</span>
            </div>
            <div v-if="index < steps.length - 1" 
              class="w-20 h-0.5 mx-2"
              :class="currentStep > index ? 'bg-pink' : 'bg-surface1'"></div>
          </div>
        </div>

        <!-- Demo Content -->
        <div class="min-h-[400px]">
          <!-- Step 1: Vote Selection -->
          <div v-if="currentStep === 0" class="space-y-6">
            <h3 class="text-2xl font-bold mb-4">Sélectionnez votre candidat</h3>
            <div class="grid gap-4">
              <label v-for="candidate in candidates" :key="candidate.id"
                class="flex items-center p-4 bg-surface0 rounded-xl border cursor-pointer transition-all"
                :class="selectedCandidate === candidate.id ? 'border-pink bg-pink/10' : 'border-surface1 hover:border-overlay0'">
                <input type="radio" :value="candidate.id" v-model="selectedCandidate" class="mr-4">
                <div class="flex items-center flex-1">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-r mr-4"
                    :class="candidate.color"></div>
                  <div>
                    <div class="font-semibold">{{ candidate.name }}</div>
                    <div class="text-sm text-subtext0">{{ candidate.description }}</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 2: Encryption -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h3 class="text-2xl font-bold mb-4">Chiffrement du vote</h3>
            <div class="bg-surface0 p-6 rounded-xl border border-surface1">
              <div class="font-mono text-sm space-y-4">
                <div>
                  <span class="text-overlay0">// Vote sélectionné:</span>
                  <div class="text-pink">Candidat {{ selectedCandidate }}</div>
                </div>
                <div>
                  <span class="text-overlay0">// Génération de l'aléa:</span>
                  <div class="text-mauve">r = {{ randomValue }}</div>
                </div>
                <div>
                  <span class="text-overlay0">// Chiffrement El Gamal:</span>
                  <div class="text-lavender">C₁ = g^r mod p</div>
                  <div class="text-lavender">C₂ = m · h^r mod p</div>
                </div>
                <div class="mt-4 p-4 bg-base rounded border border-overlay0">
                  <span class="text-overlay0">Bulletin chiffré:</span>
                  <div class="text-teal break-all">{{ encryptedBallot }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Verification -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h3 class="text-2xl font-bold mb-4">Vérification du vote</h3>
            <div class="grid gap-4">
              <div class="bg-surface0 p-6 rounded-xl border border-surface1">
                <h4 class="font-semibold mb-3 text-pink">Preuve DDH générée</h4>
                <div class="font-mono text-sm space-y-2 text-overlay1">
                  <div>challenge: {{ proof.challenge }}</div>
                  <div>response: {{ proof.response }}</div>
                  <div class="text-green mt-2">✓ Preuve valide</div>
                </div>
              </div>
              <div class="bg-surface0 p-6 rounded-xl border border-surface1">
                <h4 class="font-semibold mb-3 text-mauve">Hash du bulletin</h4>
                <div class="font-mono text-sm break-all text-overlay1">
                  {{ ballotHash }}
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Results -->
          <div v-if="currentStep === 3" class="space-y-6">
            <h3 class="text-2xl font-bold mb-4">Résultats du vote</h3>
            <div class="bg-surface0 p-6 rounded-xl border border-surface1">
              <div class="space-y-4">
                <div v-for="candidate in candidates" :key="candidate.id"
                  class="flex items-center justify-between p-4 bg-base rounded-lg">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r mr-3"
                      :class="candidate.color"></div>
                    <span class="font-semibold">{{ candidate.name }}</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-48 h-4 bg-surface1 rounded-full overflow-hidden mr-4">
                      <div class="h-full bg-gradient-to-r transition-all duration-500"
                        :class="candidate.color"
                        :style="{ width: `${candidate.votes}%` }"></div>
                    </div>
                    <span class="font-mono">{{ candidate.votes }}%</span>
                  </div>
                </div>
              </div>
              <div class="mt-6 p-4 bg-pink/10 rounded-lg border border-pink/30">
                <div class="text-sm text-pink">
                  <Icon name="heroicons:shield-check" class="w-5 h-5 inline mr-2" />
                  Tous les votes ont été vérifiés cryptographiquement
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-8">
          <button v-if="currentStep > 0" @click="currentStep--"
            class="px-6 py-3 bg-surface0 rounded-xl hover:bg-surface1 transition-colors">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 inline mr-2" />
            Précédent
          </button>
          <div v-else></div>
          <button v-if="currentStep < 3" @click="nextStep"
            class="px-6 py-3 bg-pink text-white rounded-xl hover:bg-pink/80 transition-colors"
            :disabled="currentStep === 0 && !selectedCandidate">
            Suivant
            <Icon name="heroicons:arrow-right" class="w-5 h-5 inline ml-2" />
          </button>
          <button v-else @click="resetDemo"
            class="px-6 py-3 bg-mauve text-white rounded-xl hover:bg-mauve/80 transition-colors">
            Recommencer
            <Icon name="heroicons:arrow-path" class="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const demoSection = ref<HTMLElement>()

const currentStep = ref(0)
const selectedCandidate = ref<number | null>(null)

const steps = [
  'Sélection',
  'Chiffrement',
  'Vérification',
  'Résultats'
]

const candidates = ref([
  { id: 1, name: 'Alice Protocol', description: 'Sécurité maximale', color: 'from-pink to-mauve', votes: 45 },
  { id: 2, name: 'Bob Chain', description: 'Transparence totale', color: 'from-blue to-teal', votes: 30 },
  { id: 3, name: 'Carol Crypto', description: 'Innovation constante', color: 'from-green to-yellow', votes: 25 }
])

const randomValue = computed(() => Math.floor(Math.random() * 1000000))
const encryptedBallot = computed(() => {
  if (!selectedCandidate.value) return ''
  return btoa(`ENC[${selectedCandidate.value}:${randomValue.value}]`).substring(0, 32) + '...'
})

const proof = computed(() => ({
  challenge: Math.floor(Math.random() * 1000000).toString(16),
  response: Math.floor(Math.random() * 1000000).toString(16)
}))

const ballotHash = computed(() => {
  if (!encryptedBallot.value) return ''
  return 'SHA256:' + btoa(encryptedBallot.value).substring(0, 40)
})

const nextStep = () => {
  if (currentStep.value === 0 && !selectedCandidate.value) return
  currentStep.value++
}

const resetDemo = () => {
  currentStep.value = 0
  selectedCandidate.value = null
}

defineExpose({ demoSection })
</script>