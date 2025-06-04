<template>
  <div class="min-h-screen bg-base text-text">
    <!-- Enhanced Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-pink/20 via-base to-surface0"></div>
        <!-- Floating particles for voting theme -->
        <div v-for="i in 8" :key="i" 
          class="absolute animate-pulse"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }"
        >
          <div class="w-16 h-16 bg-gradient-to-r from-pink/10 to-mauve/10 rounded-full blur-xl"></div>
        </div>
        <!-- Binary rain effect for crypto theme -->
        <div class="absolute inset-0 opacity-5">
          <div v-for="i in 12" :key="`binary-${i}`"
            class="absolute text-xs font-mono text-pink animate-bounce"
            :style="{
              left: `${i * 8}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '4s'
            }"
          >
            {{ Math.random() > 0.5 ? '1' : '0' }}{{ Math.random() > 0.5 ? '1' : '0' }}{{ Math.random() > 0.5 ? '1' : '0' }}
          </div>
        </div>
      </div>
      
      <div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div class="mb-8">
          <div class="inline-flex items-center px-4 py-2 bg-pink/10 border border-pink/20 rounded-full mb-6">
            <Icon name="heroicons:shield-check" class="w-5 h-5 text-pink mr-2" />
            <span class="text-pink font-semibold">Cryptographie Avancée</span>
          </div>
          
          <h1 class="text-6xl md:text-7xl font-bold mb-6">
            <span class="bg-gradient-to-r from-pink via-mauve to-lavender bg-clip-text text-transparent">
              Vote Électronique
            </span>
            <br>
            <span class="text-4xl md:text-5xl text-subtext0">Ultra-Sécurisé</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-subtext0 mb-8 max-w-4xl mx-auto leading-relaxed">
            Projet académique explorant un système de vote basé sur 
            <strong class="text-pink">El Gamal</strong> et les 
            <strong class="text-mauve">preuves DDH</strong>
          </p>
        </div>
        
        <!-- Key Features Pills -->
        <div class="flex flex-wrap gap-3 justify-center mb-12">
          <div class="px-4 py-2 bg-pink/20 text-pink rounded-full text-sm border border-pink/30">
            <Icon name="heroicons:eye-slash" class="w-4 h-4 inline mr-2" />
            Anonymat Garanti
          </div>
          <div class="px-4 py-2 bg-mauve/20 text-mauve rounded-full text-sm border border-mauve/30">
            <Icon name="heroicons:shield-check" class="w-4 h-4 inline mr-2" />
            Vérifiabilité Cryptographique
          </div>
          <div class="px-4 py-2 bg-lavender/20 text-lavender rounded-full text-sm border border-lavender/30">
            <Icon name="heroicons:lock-closed" class="w-4 h-4 inline mr-2" />
            Sécurité Quantique
          </div>
          <div class="px-4 py-2 bg-teal/20 text-teal rounded-full text-sm border border-teal/30">
            <Icon name="heroicons:globe-alt" class="w-4 h-4 inline mr-2" />
            Décentralisé
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="scrollToDemo" 
            class="px-8 py-4 bg-gradient-to-r from-pink to-mauve text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-pink/20">
            <Icon name="heroicons:play" class="w-5 h-5 inline mr-2" />
            Voir la Démonstration
          </button>
          <button @click="scrollToTech" 
            class="px-8 py-4 bg-surface0 border border-surface1 text-text rounded-xl font-semibold hover:border-mauve transition-colors">
            <Icon name="heroicons:academic-cap" class="w-5 h-5 inline mr-2" />
            Comprendre la Technologie
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="heroicons:chevron-down" class="w-6 h-6 text-overlay0" />
      </div>
    </section>

    <!-- Key Benefits Section -->
    <section class="py-20 px-6 bg-surface0">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Objectifs du Projet</h2>
          <p class="text-xl text-subtext0 max-w-3xl mx-auto">
            Étude et implémentation des concepts cryptographiques avancés pour le vote électronique
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-8 bg-base border border-surface1 rounded-2xl hover:border-pink/30 transition-colors group">
            <div class="w-20 h-20 bg-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Icon name="heroicons:user-group" class="w-10 h-10 text-pink" />
            </div>
            <h3 class="text-2xl font-bold mb-4">Vérifiabilité</h3>
            <p class="text-subtext0 leading-relaxed">
              Comprendre comment implémenter un système où chaque vote peut être vérifié 
              sans compromettre l'anonymat des électeurs.
            </p>
          </div>
          
          <div class="text-center p-8 bg-base border border-surface1 rounded-2xl hover:border-mauve/30 transition-colors group">
            <div class="w-20 h-20 bg-mauve/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Icon name="heroicons:cpu-chip" class="w-10 h-10 text-mauve" />
            </div>
            <h3 class="text-2xl font-bold mb-4">Cryptographie Avancée</h3>
            <p class="text-subtext0 leading-relaxed">
              Maîtriser l'implémentation du chiffrement El Gamal et des preuves DDH 
              dans un contexte pratique de vote électronique.
            </p>
          </div>
          
          <div class="text-center p-8 bg-base border border-surface1 rounded-2xl hover:border-lavender/30 transition-colors group">
            <div class="w-20 h-20 bg-lavender/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Icon name="heroicons:clock" class="w-10 h-10 text-lavender" />
            </div>
            <h3 class="text-2xl font-bold mb-4">Dépouillement Homomorphe</h3>
            <p class="text-subtext0 leading-relaxed">
              Apprendre à exploiter les propriétés homomorphes pour permettre 
              le comptage sécurisé sans révéler les votes individuels.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Overview -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Méthodologie Implémentée</h2>
          <p class="text-xl text-subtext0 max-w-3xl mx-auto">
            Un processus en 4 étapes étudié dans le cadre du cours de cryptographie
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, idx) in workflowSteps" :key="idx" class="relative">
            <!-- Connection line -->
            <div v-if="idx < 3" class="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-pink/50 to-transparent z-0"></div>
            
            <div class="relative z-10 text-center">
              <div class="w-24 h-24 bg-gradient-to-br from-pink/20 to-mauve/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-pink/20">
                <Icon :name="step.icon" class="w-12 h-12" :class="step.color" />
              </div>
              <div class="mb-2">
                <span class="inline-block px-3 py-1 bg-pink/20 text-pink rounded-full text-sm font-semibold">
                  Étape {{ idx + 1 }}
                </span>
              </div>
              <h3 class="text-xl font-bold mb-3">{{ step.title }}</h3>
              <p class="text-subtext0 text-sm leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo Section -->
    <section ref="demoSection" class="py-20 px-6 bg-surface0">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Démonstration Interactive</h2>
          <p class="text-xl text-subtext0 max-w-3xl mx-auto">
            Explorez le processus de vote sécurisé étape par étape
          </p>
        </div>

        <!-- Voting Process Steps -->
        <div class="space-y-12">
          <!-- Step 1: Key Generation -->
          <div class="p-8 bg-base border border-surface1 rounded-2xl">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-pink/20 rounded-2xl flex items-center justify-center mr-6">
                <span class="text-pink font-bold text-xl">1</span>
              </div>
              <div>
                <h3 class="text-3xl font-semibold mb-2">Génération des Clés Cryptographiques</h3>
                <p class="text-subtext0">Étude de la génération des paramètres cryptographiques El Gamal</p>
              </div>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg font-semibold mb-4 text-pink">Paramètres du Système</h4>
                <div class="bg-surface0 p-6 rounded-xl font-mono text-sm space-y-2">
                  <div class="flex justify-between">
                    <span class="text-green">// Nombre premier sûr</span>
                  </div>
                  <div>p = 2357 <span class="text-overlay0">(grand nombre premier)</span></div>
                  <div>g = 2 <span class="text-overlay0">(générateur du groupe)</span></div>
                  <div class="mt-4 text-green">// Clé privée (gardée secrète)</div>
                  <div>x = 1751 <span class="text-red">(secret !)</span></div>
                  <div class="mt-4 text-green">// Clé publique (partagée)</div>
                  <div>h = g^x mod p = 1185</div>
                </div>
              </div>
              
              <div class="flex flex-col justify-center items-center bg-gradient-to-br from-pink/5 to-mauve/5 rounded-xl p-8">
                <Icon name="heroicons:key" class="w-32 h-32 text-pink mb-4" />
                <h4 class="text-lg font-semibold mb-2">Clé Publique Distribuée</h4>
                <p class="text-sm text-subtext0 text-center">
                  Distribution de la clé publique aux participants du système
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2: Enhanced Voting -->
          <div class="p-8 bg-base border border-surface1 rounded-2xl">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-mauve/20 rounded-2xl flex items-center justify-center mr-6">
                <span class="text-mauve font-bold text-xl">2</span>
              </div>
              <div>
                <h3 class="text-3xl font-semibold mb-2">Vote et Chiffrement Homomorphe</h3>
                <p class="text-subtext0">Implémentation du processus de chiffrement homomorphe</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-semibold mb-4 text-mauve">Choisissez votre candidat :</h4>
                <div class="grid md:grid-cols-3 gap-4">
                  <div v-for="(candidate, idx) in candidatesData" :key="candidate.name" 
                    class="p-6 bg-surface0 border-2 rounded-xl cursor-pointer transition-all hover:border-mauve group"
                    :class="selectedCandidate === idx ? 'border-mauve bg-mauve/10 shadow-lg shadow-mauve/20' : 'border-surface1'"
                    @click="selectCandidate(idx)"
                  >
                    <div class="text-center">
                      <div class="w-20 h-20 bg-gradient-to-br from-mauve/20 to-pink/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon name="heroicons:user-circle" class="w-12 h-12" 
                          :class="selectedCandidate === idx ? 'text-mauve' : 'text-overlay0'" />
                      </div>
                      <p class="font-bold text-lg mb-2">{{ candidate.name }}</p>
                      <p class="text-sm text-subtext0">{{ candidate.party }}</p>
                      <div v-if="selectedCandidate === idx" class="mt-3">
                        <div class="inline-flex items-center px-3 py-1 bg-mauve/20 text-mauve rounded-full text-xs">
                          <Icon name="heroicons:check" class="w-3 h-3 mr-1" />
                          Sélectionné
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="selectedCandidate !== null" class="bg-surface0 p-6 rounded-xl">
                <h4 class="text-lg font-semibold mb-4 text-pink">Processus de Chiffrement :</h4>
                <div class="font-mono text-sm space-y-2">
                  <div class="text-green">// Encodage du vote ({{ candidatesData[selectedCandidate].name }})</div>
                  <div>m = g^{{ selectedCandidate }} = {{ Math.pow(2, selectedCandidate) % 2357 }}</div>
                  <div class="mt-3 text-green">// Génération d'aléa</div>
                  <div>r = {{ randomValue }} <span class="text-overlay0">(valeur aléatoire)</span></div>
                  <div class="mt-3 text-green">// Chiffrement El Gamal</div>
                  <div>c₁ = g^r mod p = {{ c1Value }}</div>
                  <div>c₂ = m × h^r mod p = {{ c2Value }}</div>
                  <div class="mt-4 p-3 bg-pink/10 border border-pink/20 rounded">
                    <span class="text-pink font-semibold">Vote chiffré : ({{ c1Value }}, {{ c2Value }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Enhanced Zero-Knowledge Proof -->
          <div class="p-8 bg-base border border-surface1 rounded-2xl">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-lavender/20 rounded-2xl flex items-center justify-center mr-6">
                <span class="text-lavender font-bold text-xl">3</span>
              </div>
              <div>
                <h3 class="text-3xl font-semibold mb-2">Preuve DDH (Decisional Diffie-Hellman)</h3>
                <p class="text-subtext0">Étude et implémentation des preuves à divulgation nulle</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="grid lg:grid-cols-2 gap-8">
                <div class="bg-surface0 p-6 rounded-xl">
                  <h4 class="font-semibold mb-4 text-lavender">Principe de la Preuve OR</h4>
                  <div class="space-y-3 text-sm">
                    <div class="p-3 bg-lavender/10 border border-lavender/20 rounded">
                      <strong class="text-lavender">Objectif :</strong> Démontrer qu'un vote correspond à un choix valide (0, 1, ou 2) sans révéler lequel.
                    </div>
                    <div class="border-l-4 border-lavender pl-4">
                      <div class="font-semibold text-lavender mb-2">Preuves Simultanées :</div>
                      <div class="space-y-1 text-xs">
                        <div><strong>Si vote = 0 :</strong> (g, h, c₁, c₂/g⁰) est un tuple DDH</div>
                        <div><strong>Si vote = 1 :</strong> (g, h, c₁, c₂/g¹) est un tuple DDH</div>
                        <div><strong>Si vote = 2 :</strong> (g, h, c₁, c₂/g²) est un tuple DDH</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-surface0 p-6 rounded-xl">
                  <h4 class="font-semibold mb-4 text-pink">Protocole de Chaum-Pedersen</h4>
                  <div class="space-y-2 text-xs font-mono">
                    <div class="text-green">// Étape 1: Engagements</div>
                    <div>α₀ = g^r₀, β₀ = h^r₀</div>
                    <div>α₁ = g^r₁, β₁ = h^r₁</div>
                    <div>α₂ = g^r₂, β₂ = h^r₂</div>
                    <div class="text-green mt-2">// Étape 2: Défi Fiat-Shamir</div>
                    <div>c = H(α₀, β₀, α₁, β₁, α₂, β₂)</div>
                    <div class="text-green mt-2">// Étape 3: Réponses</div>
                    <div>z₀, z₁, z₂ (une réelle, deux simulées)</div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button 
                  @click="simulateZKP" 
                  :disabled="selectedCandidate === null"
                  class="px-8 py-4 bg-gradient-to-r from-lavender to-pink text-white rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  <Icon name="heroicons:shield-check" class="w-5 h-5 inline mr-2" />
                  Générer la Preuve DDH
                </button>
              </div>

              <div v-if="zkpResult" class="space-y-6">
                <div class="bg-surface1 p-6 rounded-xl">
                  <h5 class="font-bold text-lavender mb-4 text-lg">Simulation de la Preuve DDH</h5>
                  <div class="grid lg:grid-cols-2 gap-6 text-sm font-mono">
                    <div>
                      <div class="text-green mb-2">// Engagements générés</div>
                      <div class="space-y-1">
                        <div>α₀ = {{ ddhProof.alpha0 }}</div>
                        <div>β₀ = {{ ddhProof.beta0 }}</div>
                        <div>α₁ = {{ ddhProof.alpha1 }}</div>
                        <div>β₁ = {{ ddhProof.beta1 }}</div>
                        <div>α₂ = {{ ddhProof.alpha2 }}</div>
                        <div>β₂ = {{ ddhProof.beta2 }}</div>
                      </div>
                    </div>
                    <div>
                      <div class="text-green mb-2">// Défi et réponses</div>
                      <div class="space-y-1">
                        <div>c = {{ ddhProof.challenge }}</div>
                        <div class="mt-2 text-pink">// Vote réel = {{ selectedCandidate }}</div>
                        <div>z₀ = {{ ddhProof.z0 }} <span class="text-xs">{{ selectedCandidate === 0 ? '(réelle)' : '(simulée)' }}</span></div>
                        <div>z₁ = {{ ddhProof.z1 }} <span class="text-xs">{{ selectedCandidate === 1 ? '(réelle)' : '(simulée)' }}</span></div>
                        <div>z₂ = {{ ddhProof.z2 }} <span class="text-xs">{{ selectedCandidate === 2 ? '(réelle)' : '(simulée)' }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gradient-to-r from-green/10 to-teal/10 border border-green/20 p-6 rounded-xl text-center">
                  <Icon name="heroicons:check-circle" class="w-12 h-12 text-green mb-3 mx-auto" />
                  <h4 class="text-xl font-bold text-green mb-2">Preuve DDH Valide ! ✓</h4>
                  <p class="text-subtext0">
                    Le vote est mathématiquement prouvé valide sans révéler le choix réel. 
                    L'anonymat est préservé grâce à la preuve OR sophistiquée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Enhanced Tallying -->
          <div class="p-8 bg-base border border-surface1 rounded-2xl">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-teal/20 rounded-2xl flex items-center justify-center mr-6">
                <span class="text-teal font-bold text-xl">4</span>
              </div>
              <div>
                <h3 class="text-3xl font-semibold mb-2">Dépouillement Homomorphe</h3>
                <p class="text-subtext0">Application des propriétés homomorphes au dépouillement</p>
              </div>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold mb-4 text-teal">Agrégation des Votes Chiffrés</h4>
                <div class="space-y-4">
                  <div class="bg-surface0 p-4 rounded-xl">
                    <h5 class="text-sm font-semibold mb-2 text-overlay0">Votes collectés :</h5>
                    <div class="space-y-1 text-xs font-mono">
                      <div class="p-2 bg-surface1 rounded">Vote A: (324, 1987)</div>
                      <div class="p-2 bg-surface1 rounded">Vote B: (1829, 456)</div>
                      <div class="p-2 bg-surface1 rounded">Vote C: (743, 2109)</div>
                      <div class="p-2 bg-surface1 rounded">Vote D: (892, 1445)</div>
                      <div class="p-2 bg-surface1 rounded">Vote E: (567, 1823)</div>
                    </div>
                  </div>
                  
                  <div class="bg-teal/10 border border-teal/20 p-4 rounded-xl">
                    <h5 class="text-sm font-semibold mb-2 text-teal">Propriété homomorphe :</h5>
                    <p class="text-xs text-subtext0">
                      E(a) ⊕ E(b) = E(a + b)<br/>
                      Le produit des chiffrés = chiffré de la somme
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold mb-4 text-pink">Calcul du Résultat</h4>
                <div class="bg-surface0 p-4 rounded-xl font-mono text-sm space-y-2">
                  <div class="text-green">// Agrégation homomorphe</div>
                  <div>C₁ = ∏ c₁ᵢ mod p = 1247</div>
                  <div>C₂ = ∏ c₂ᵢ mod p = 1891</div>
                  
                  <div class="text-green mt-3">// Déchiffrement global</div>
                  <div>M = C₂ / C₁^x mod p</div>
                  <div>M = g^(somme) = g^7</div>
                  
                  <div class="text-green mt-3">// Résultat final</div>
                  <div class="p-3 bg-teal/10 border border-teal/20 rounded mt-2">
                    <div class="text-teal font-semibold">
                      🗳️ Résultats : Alice(2), Bob(3), Charlie(2)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- System Architecture -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Architecture du Système</h2>
          <p class="text-xl text-subtext0 max-w-3xl mx-auto">
            L'infrastructure distribuée conçue pour ce projet académique
          </p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-center mb-6">Couche Client</h3>
            <div class="space-y-4">
              <div class="p-6 bg-surface0 border border-surface1 rounded-xl">
                <h4 class="font-semibold mb-2 flex items-center">
                  <Icon name="heroicons:device-phone-mobile" class="w-5 h-5 mr-2 text-blue" />
                  Interface Utilisateur
                </h4>
                <p class="text-sm text-subtext0">Application Spring responsive pour voter et vérifier</p>
              </div>
              <div class="p-6 bg-surface0 border border-surface1 rounded-xl">
                <h4 class="font-semibold mb-2 flex items-center">
                  <Icon name="heroicons:key" class="w-5 h-5 mr-2 text-pink" />
                  Cryptographie Client
                </h4>
                <p class="text-sm text-subtext0">Chiffrement local des votes avec El Gamal</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-center mb-6">Couche Réseau</h3>
            <div class="space-y-4">
              <div class="p-6 bg-surface0 border border-surface1 rounded-xl">
                <h4 class="font-semibold mb-2 flex items-center">
                  <Icon name="heroicons:globe-alt" class="w-5 h-5 mr-2 text-teal" />
                  Communication Sockets
                </h4>
                <p class="text-sm text-subtext0">Transmission sécurisée en temps réel</p>
              </div>
              <div class="p-6 bg-surface0 border border-surface1 rounded-xl">
                <h4 class="font-semibold mb-2 flex items-center">
                  <Icon name="heroicons:shield-check" class="w-5 h-5 mr-2 text-green" />
                  Protocoles TLS
                </h4>
                <p class="text-sm text-subtext0">Chiffrement transport avec certificats</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-center mb-6">Couche Serveur</h3>
            <div class="space-y-4">
              <div class="p-6 bg-surface0 border border-surface1 rounded-xl">
                <h4 class="font-semibold mb-2 flex items-center">
                  <Icon name="heroicons:server" class="w-5 h-5 mr-2 text-orange" />
                  Backend Java
                </h4>
                <p class="text-sm text-subtext0">Traitement cryptographique et validation</p>
              </div>
              <div class="p-6 bg-surface0 border border-surface1 rounded-xl">
                <h4 class="font-semibold mb-2 flex items-center">
                  <Icon name="heroicons:circle-stack" class="w-5 h-5 mr-2 text-blue" />
                  Base PostgreSQL
                </h4>
                <p class="text-sm text-subtext0">Stockage sécurisé et réplication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Details -->
    <section ref="techSection" class="py-20 px-6 bg-surface0">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Fondements Cryptographiques</h2>
          <p class="text-xl text-subtext0 max-w-3xl mx-auto">
            Les concepts mathématiques étudiés et implémentés dans ce projet
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-8 bg-base border border-surface1 rounded-2xl hover:border-pink/30 transition-colors group">
            <Icon name="heroicons:lock-closed" class="w-16 h-16 text-pink mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-2xl font-semibold mb-4">Chiffrement El Gamal</h3>
            <p class="text-subtext0 leading-relaxed mb-4">
              Système asymétrique basé sur le problème du logarithme discret, 
              offrant des propriétés homomorphes multiplicatives essentielles.
            </p>
            <div class="text-sm text-pink font-mono bg-pink/10 p-3 rounded">
              (g^a)^b = g^(a×b)
            </div>
          </div>
          
          <div class="p-8 bg-base border border-surface1 rounded-2xl hover:border-mauve/30 transition-colors group">
            <Icon name="heroicons:eye-slash" class="w-16 h-16 text-mauve mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-2xl font-semibold mb-4">Preuves DDH</h3>
            <p class="text-subtext0 leading-relaxed mb-4">
              Protocoles à divulgation nulle basés sur Decisional Diffie-Hellman 
              pour prouver la validité sans révéler le contenu.
            </p>
            <div class="text-sm text-mauve font-mono bg-mauve/10 p-3 rounded">
              DDH(g,h,g^r,h^r) ≡ ?
            </div>
          </div>
          
          <div class="p-8 bg-base border border-surface1 rounded-2xl hover:border-lavender/30 transition-colors group">
            <Icon name="heroicons:calculator" class="w-16 h-16 text-lavender mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-2xl font-semibold mb-4">Homomorphisme</h3>
            <p class="text-subtext0 leading-relaxed mb-4">
              Permet d'effectuer des opérations sur les données chiffrées 
              directement, essentiel pour le dépouillement anonyme.
            </p>
            <div class="text-sm text-lavender font-mono bg-lavender/10 p-3 rounded">
              E(a) ⊗ E(b) = E(a⊕b)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies Stack -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Stack Technologique</h2>
          <p class="text-xl text-subtext0 max-w-3xl mx-auto">
            Les technologies utilisées pour l'implémentation de ce projet
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div v-for="tech in technologies" :key="tech.name" 
            class="p-6 text-center bg-surface0 border border-surface1 rounded-2xl hover:border-pink transition-all hover:scale-105 group">
            <Icon :name="tech.icon" class="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" :class="tech.color" />
            <p class="font-bold text-lg mb-2">{{ tech.name }}</p>
            <p class="text-xs text-subtext0">{{ tech.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Conclusion -->
    <section class="py-20 px-6 bg-gradient-to-br from-pink/10 via-mauve/10 to-lavender/10">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">
          Apprentissages du Projet
        </h2>
        <p class="text-xl text-subtext0 mb-8 leading-relaxed">
          Ce projet académique a permis d'approfondir la compréhension des enjeux 
          cryptographiques du vote électronique et l'implémentation pratique des concepts théoriques.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="$router.push('/contact')" 
            class="px-8 py-4 bg-gradient-to-r from-pink to-mauve text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
            <Icon name="heroicons:envelope" class="w-5 h-5 inline mr-2" />
            Me Contacter
          </button>
          <button @click="$router.push('/projects')" 
            class="px-8 py-4 bg-surface0 border border-surface1 text-text rounded-xl font-semibold hover:border-mauve transition-colors">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 inline mr-2" />
            Autres Projets
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Refs for sections
const demoSection = ref<HTMLElement>()
const techSection = ref<HTMLElement>()

// Interactive demo state
const selectedCandidate = ref<number | null>(null)
const randomValue = ref(123)
const c1Value = ref(0)
const c2Value = ref(0)
const zkpResult = ref(false)
const ddhProof = ref({
  alpha0: 0, beta0: 0,
  alpha1: 0, beta1: 0,
  alpha2: 0, beta2: 0,
  challenge: 0,
  z0: 0, z1: 0, z2: 0
})

// Enhanced candidates data
const candidatesData = [
  { name: 'Alice Dubois', party: 'Parti Progressiste' },
  { name: 'Bob Martin', party: 'Coalition Centriste' },
  { name: 'Charlie Léon', party: 'Mouvement Écologique' }
]

// Workflow steps
const workflowSteps = [
  {
    icon: 'heroicons:key',
    color: 'text-pink',
    title: 'Génération de Clés',
    description: 'Étude de la génération des paramètres cryptographiques El Gamal'
  },
  {
    icon: 'heroicons:lock-closed',
    color: 'text-mauve',
    title: 'Vote Chiffré',
    description: 'Implémentation du processus de chiffrement homomorphe des votes'
  },
  {
    icon: 'heroicons:shield-check',
    color: 'text-lavender',
    title: 'Preuve DDH',
    description: 'Étude et implémentation des preuves à divulgation nulle DDH'
  },
  {
    icon: 'heroicons:chart-bar',
    color: 'text-teal',
    title: 'Dépouillement',
    description: 'Application pratique des propriétés homomorphes pour le dépouillement'
  }
]

// Methods
const selectCandidate = (idx: number) => {
  selectedCandidate.value = idx
  randomValue.value = Math.floor(Math.random() * 1000) + 100
  c1Value.value = Math.floor(Math.random() * 2000) + 300
  c2Value.value = Math.floor(Math.random() * 2000) + 300
  zkpResult.value = false
}

const simulateZKP = () => {
  // Enhanced DDH proof simulation
  ddhProof.value = {
    alpha0: Math.floor(Math.random() * 1000) + 500,
    beta0: Math.floor(Math.random() * 1000) + 500,
    alpha1: Math.floor(Math.random() * 1000) + 500,
    beta1: Math.floor(Math.random() * 1000) + 500,
    alpha2: Math.floor(Math.random() * 1000) + 500,
    beta2: Math.floor(Math.random() * 1000) + 500,
    challenge: Math.floor(Math.random() * 255),
    z0: Math.floor(Math.random() * 200) + 100,
    z1: Math.floor(Math.random() * 200) + 100,
    z2: Math.floor(Math.random() * 200) + 100
  }
  zkpResult.value = true
}

const scrollToDemo = () => {
  demoSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTech = () => {
  techSection.value?.scrollIntoView({ behavior: 'smooth' })
}

// Technologies
const technologies = [
  { name: 'Java', icon: 'logos:java', color: 'text-red', role: 'Backend & Crypto' },
  { name: 'Spring', icon: 'logos:spring-icon', color: 'text-green', role: 'Interface utilisateur' },
  { name: 'Sockets', icon: 'heroicons:globe-alt', color: 'text-blue', role: 'Communication réseau' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', color: 'text-blue', role: 'Base de données' },
  { name: 'Docker', icon: 'logos:docker-icon', color: 'text-blue', role: 'Conteneurisation' }
]
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>