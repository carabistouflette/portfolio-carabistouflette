<template>
  <section ref="techSection" class="py-20 px-6 bg-surface0">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-6">Technologies Cryptographiques</h2>
        <p class="text-xl text-subtext0 max-w-3xl mx-auto">
          Comprendre les fondements mathématiques et cryptographiques du système
        </p>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- El Gamal Encryption -->
        <div class="bg-base p-8 rounded-2xl border border-surface1">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-pink/20 rounded-xl flex items-center justify-center mr-4">
              <Icon name="heroicons:key" class="w-6 h-6 text-pink" />
            </div>
            <h3 class="text-2xl font-bold">Chiffrement El Gamal</h3>
          </div>
          
          <div class="space-y-4">
            <p class="text-subtext0">
              Un système de chiffrement asymétrique basé sur le problème du logarithme discret,
              offrant des propriétés homomorphes essentielles pour le vote électronique.
            </p>
            
            <div class="bg-surface0 p-4 rounded-xl font-mono text-sm space-y-2">
              <div class="text-overlay0">// Génération des clés</div>
              <div class="text-pink">sk = x ∈ Zp</div>
              <div class="text-pink">pk = g^x mod p</div>
              
              <div class="text-overlay0 mt-4">// Chiffrement d'un message m</div>
              <div class="text-mauve">r ← Zp (aléa)</div>
              <div class="text-mauve">c₁ = g^r mod p</div>
              <div class="text-mauve">c₂ = m · pk^r mod p</div>
              
              <div class="text-overlay0 mt-4">// Propriété homomorphe</div>
              <div class="text-lavender">Enc(m₁) · Enc(m₂) = Enc(m₁ + m₂)</div>
            </div>
            
            <div class="flex items-start text-sm text-subtext0">
              <Icon name="heroicons:information-circle" class="w-5 h-5 mr-2 text-teal flex-shrink-0 mt-0.5" />
              <span>Cette propriété permet d'additionner les votes chiffrés sans les déchiffrer</span>
            </div>
          </div>
        </div>
        
        <!-- DDH Proofs -->
        <div class="bg-base p-8 rounded-2xl border border-surface1">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-mauve/20 rounded-xl flex items-center justify-center mr-4">
              <Icon name="heroicons:shield-check" class="w-6 h-6 text-mauve" />
            </div>
            <h3 class="text-2xl font-bold">Preuves DDH</h3>
          </div>
          
          <div class="space-y-4">
            <p class="text-subtext0">
              Les preuves à divulgation nulle de connaissance basées sur l'hypothèse DDH
              permettent de prouver la validité d'un vote sans révéler son contenu.
            </p>
            
            <div class="bg-surface0 p-4 rounded-xl font-mono text-sm space-y-2">
              <div class="text-overlay0">// Preuve de validité du chiffrement</div>
              <div class="text-pink">Prouver: log_g(c₁) = log_pk(c₂/m)</div>
              
              <div class="text-overlay0 mt-4">// Protocole Sigma</div>
              <div class="text-mauve">1. Commit: a = g^w, b = pk^w</div>
              <div class="text-mauve">2. Challenge: e ← Zp</div>
              <div class="text-mauve">3. Response: s = w + e·r</div>
              
              <div class="text-overlay0 mt-4">// Vérification</div>
              <div class="text-lavender">g^s = a · c₁^e</div>
              <div class="text-lavender">pk^s = b · (c₂/m)^e</div>
            </div>
            
            <div class="flex items-start text-sm text-subtext0">
              <Icon name="heroicons:information-circle" class="w-5 h-5 mr-2 text-teal flex-shrink-0 mt-0.5" />
              <span>Garantit qu'un vote est valide sans révéler pour qui il a été émis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const techSection = ref<HTMLElement>()

defineExpose({ techSection })
</script>