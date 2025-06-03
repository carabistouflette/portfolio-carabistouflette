<template>
  <div class="min-h-screen bg-base text-text">
    <!-- Enhanced Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-lavender/20 via-base to-surface0"></div>
        <!-- Floating particles for game theme -->
        <div v-for="i in 8" :key="i" 
          class="absolute animate-pulse"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }"
        >
          <div class="w-16 h-16 bg-gradient-to-r from-lavender/10 to-mauve/10 rounded-full blur-xl"></div>
        </div>
        <!-- Train tracks pattern -->
        <div class="absolute inset-0 opacity-5">
          <div v-for="i in 12" :key="`track-${i}`"
            class="absolute text-3xl text-lavender animate-pulse"
            :style="{
              left: `${i * 8}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '6s'
            }"
          >
            🚂
          </div>
        </div>
      </div>
      
      <div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div class="mb-8">
          <div class="inline-flex items-center px-4 py-2 bg-lavender/10 border border-lavender/20 rounded-full mb-6">
            <span class="w-5 h-5 text-lavender mr-2">🎮</span>
            <span class="text-lavender font-semibold">Projet Universitaire SAE</span>
          </div>
          
          <h1 class="text-6xl md:text-7xl font-bold mb-6">
            <span class="bg-gradient-to-r from-lavender via-mauve to-blue bg-clip-text text-transparent">
              Jeu Train
            </span>
            <br>
            <span class="text-4xl md:text-5xl text-subtext0">Java & JavaFX</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-subtext0 mb-8 max-w-4xl mx-auto leading-relaxed">
            Adaptation numérique mettant en pratique les principes de 
            <strong class="text-lavender">Programmation Orientée Objet</strong> et le développement 
            <strong class="text-mauve">d'Interfaces Homme-Machine</strong>
          </p>
        </div>
        
        <!-- Key Features Pills -->
        <div class="flex flex-wrap gap-3 justify-center mb-12">
          <div class="px-4 py-2 bg-lavender/20 text-lavender rounded-full text-sm border border-lavender/30">
            <span class="w-4 h-4 inline mr-2">☕</span>
            Java 17
          </div>
          <div class="px-4 py-2 bg-mauve/20 text-mauve rounded-full text-sm border border-mauve/30">
            <span class="w-4 h-4 inline mr-2">🎨</span>
            JavaFX
          </div>
          <div class="px-4 py-2 bg-blue/20 text-blue rounded-full text-sm border border-blue/30">
            <span class="w-4 h-4 inline mr-2">🏗️</span>
            Architecture MVC
          </div>
          <div class="px-4 py-2 bg-green/20 text-green rounded-full text-sm border border-green/30">
            <span class="w-4 h-4 inline mr-2">👥</span>
            Travail d'équipe
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="scrollToTech" 
            class="px-8 py-4 bg-gradient-to-r from-lavender to-mauve text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-lavender/20">
            <span class="w-5 h-5 inline mr-2">🏗️</span>
            Architecture Technique
          </button>
          <button @click="scrollToCode" 
            class="px-8 py-4 bg-surface0 border border-surface1 text-text rounded-xl font-semibold hover:border-lavender transition-colors">
            <span class="w-5 h-5 inline mr-2">💻</span>
            Exemples de Code
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <span class="text-overlay0 text-2xl">⌄</span>
      </div>
    </section>

    <!-- Key Benefits Section -->
    <section class="py-20 px-6 bg-surface0">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">
          <span class="bg-gradient-to-r from-lavender to-mauve bg-clip-text text-transparent">
            Points Clés du Projet
          </span>
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-8 bg-base rounded-2xl border border-surface1 hover:border-lavender transition-colors">
            <div class="w-20 h-20 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              🎯
            </div>
            <h3 class="text-xl font-semibold mb-4 text-lavender">Gameplay Stratégique</h3>
            <p class="text-subtext0">
              Système de cartes avec effets uniques, synergies entre couleurs et mécaniques de points de victoire
            </p>
          </div>
          
          <div class="text-center p-8 bg-base rounded-2xl border border-surface1 hover:border-mauve transition-colors">
            <div class="w-20 h-20 bg-mauve/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              🏛️
            </div>
            <h3 class="text-xl font-semibold mb-4 text-mauve">Architecture Solide</h3>
            <p class="text-subtext0">
              Application rigoureuse des principes SOLID et du pattern MVC pour une base de code maintenable
            </p>
          </div>
          
          <div class="text-center p-8 bg-base rounded-2xl border border-surface1 hover:border-blue transition-colors">
            <div class="w-20 h-20 bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              ✨
            </div>
            <h3 class="text-xl font-semibold mb-4 text-blue">Interface Moderne</h3>
            <p class="text-subtext0">
              IHM intuitive avec animations fluides, feedback visuel et expérience utilisateur optimisée
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Architecture Section -->
    <section id="tech" class="py-20 px-6 bg-mantle">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">
            <span class="bg-gradient-to-r from-blue to-sapphire bg-clip-text text-transparent">
              Architecture Technique
            </span>
          </h2>
          <p class="text-xl text-subtext0">Une base de code robuste et maintenable</p>
        </div>

        <!-- POO Principles -->
        <div class="mb-16">
          <h3 class="text-2xl font-semibold text-center mb-8 text-blue">Principes de POO Appliqués</h3>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-surface0 p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <div class="text-3xl mb-4">🏗️</div>
              <h4 class="font-semibold text-lavender mb-2">Héritage</h4>
              <p class="text-sm text-subtext0">
                Hiérarchie de classes pour les différents types de cartes et trains
              </p>
            </div>
            
            <div class="bg-surface0 p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <div class="text-3xl mb-4">🔄</div>
              <h4 class="font-semibold text-mauve mb-2">Polymorphisme</h4>
              <p class="text-sm text-subtext0">
                Comportements spécifiques selon le type avec interfaces communes
              </p>
            </div>
            
            <div class="bg-surface0 p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <div class="text-3xl mb-4">🔒</div>
              <h4 class="font-semibold text-blue mb-2">Encapsulation</h4>
              <p class="text-sm text-subtext0">
                Protection des données internes et exposition contrôlée des APIs
              </p>
            </div>
            
            <div class="bg-surface0 p-6 rounded-xl text-center hover:scale-105 transition-transform">
              <div class="text-3xl mb-4">🎯</div>
              <h4 class="font-semibold text-green mb-2">Abstraction</h4>
              <p class="text-sm text-subtext0">
                Simplification des interactions complexes via des interfaces claires
              </p>
            </div>
          </div>
        </div>

        <!-- MVC Architecture -->
        <div class="bg-surface0 rounded-2xl p-8 border border-surface1">
          <h3 class="text-2xl font-semibold text-center mb-8 text-sapphire">Architecture MVC</h3>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-24 h-24 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                📊
              </div>
              <h4 class="font-semibold text-lavender mb-3">Modèle</h4>
              <ul class="text-sm text-subtext0 space-y-2 text-left">
                <li>• Logique métier du jeu</li>
                <li>• Gestion des états</li>
                <li>• Règles de validation</li>
                <li>• Persistance des données</li>
              </ul>
            </div>
            
            <div class="text-center">
              <div class="w-24 h-24 bg-mauve/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                🎨
              </div>
              <h4 class="font-semibold text-mauve mb-3">Vue</h4>
              <ul class="text-sm text-subtext0 space-y-2 text-left">
                <li>• Interface JavaFX</li>
                <li>• Composants réutilisables</li>
                <li>• Animations fluides</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            
            <div class="text-center">
              <div class="w-24 h-24 bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                🎮
              </div>
              <h4 class="font-semibold text-blue mb-3">Contrôleur</h4>
              <ul class="text-sm text-subtext0 space-y-2 text-left">
                <li>• Gestion des événements</li>
                <li>• Coordination M-V</li>
                <li>• Validation des actions</li>
                <li>• État de l'application</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Examples Section -->
    <section id="code" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">
          <span class="bg-gradient-to-r from-green to-teal bg-clip-text text-transparent">
            Exemples de Code
          </span>
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Card Class Example -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-green">Classe de Carte Abstraite</h3>
            <div class="bg-surface0 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre class="text-subtext0"><span class="text-mauve">public abstract class</span> <span class="text-blue">CarteTrain</span> {
    <span class="text-mauve">protected</span> <span class="text-yellow">String</span> nom;
    <span class="text-mauve">protected</span> <span class="text-yellow">Couleur</span> couleur;
    <span class="text-mauve">protected</span> <span class="text-lavender">int</span> valeurBase;
    
    <span class="text-mauve">public abstract</span> <span class="text-lavender">int</span> <span class="text-green">calculerPoints</span>(<span class="text-yellow">Plateau</span> plateau);
    
    <span class="text-mauve">public abstract void</span> <span class="text-green">appliquerEffet</span>(<span class="text-yellow">Joueur</span> joueur);
    
    <span class="text-mauve">protected</span> <span class="text-lavender">int</span> <span class="text-green">calculerBonus</span>(<span class="text-yellow">List</span><<span class="text-yellow">CarteTrain</span>> cartes) {
        <span class="text-comment">// Logique de calcul des synergies</span>
        <span class="text-mauve">return</span> cartes.stream()
            .filter(c -> c.couleur == <span class="text-mauve">this</span>.couleur)
            .mapToInt(c -> c.valeurBase)
            .sum() / <span class="text-lavender">2</span>;
    }
}</pre>
            </div>
          </div>

          <!-- Controller Example -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-blue">Contrôleur de Partie</h3>
            <div class="bg-surface0 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre class="text-subtext0"><span class="text-yellow">@FXML</span>
<span class="text-mauve">public class</span> <span class="text-blue">PartieController</span> {
    <span class="text-yellow">@FXML</span> <span class="text-mauve">private</span> <span class="text-yellow">GridPane</span> plateauGrid;
    <span class="text-yellow">@FXML</span> <span class="text-mauve">private</span> <span class="text-yellow">Label</span> scoreLabel;
    
    <span class="text-mauve">private</span> <span class="text-yellow">PartieModel</span> model;
    <span class="text-mauve">private</span> <span class="text-yellow">AnimationTimer</span> gameLoop;
    
    <span class="text-yellow">@FXML</span>
    <span class="text-mauve">public void</span> <span class="text-green">jouerCarte</span>(<span class="text-yellow">ActionEvent</span> event) {
        <span class="text-yellow">CarteTrain</span> carte = getCarteSelectionnee();
        
        <span class="text-mauve">if</span> (model.validerAction(carte)) {
            animerPlacement(carte);
            model.jouerCarte(carte);
            updateUI();
        }
    }
}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Outcomes -->
    <section class="py-20 px-6 bg-surface0">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">
          <span class="bg-gradient-to-r from-mauve to-pink bg-clip-text text-transparent">
            Compétences Développées
          </span>
        </h2>

        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-semibold mb-6 text-mauve">Techniques</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-mauve/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  ☕
                </div>
                <div>
                  <h4 class="font-semibold text-lavender mb-1">Java Avancé</h4>
                  <p class="text-sm text-subtext0">
                    Maîtrise des concepts avancés : génériques, streams, lambda expressions
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  🎨
                </div>
                <div>
                  <h4 class="font-semibold text-blue mb-1">JavaFX & FXML</h4>
                  <p class="text-sm text-subtext0">
                    Création d'interfaces modernes avec animations et data binding
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  🏗️
                </div>
                <div>
                  <h4 class="font-semibold text-green mb-1">Design Patterns</h4>
                  <p class="text-sm text-subtext0">
                    Application de patterns : Observer, Strategy, Factory, Singleton
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-semibold mb-6 text-pink">Transversales</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-pink/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  👥
                </div>
                <div>
                  <h4 class="font-semibold text-pink mb-1">Travail en Équipe</h4>
                  <p class="text-sm text-subtext0">
                    Collaboration via Git, revues de code, méthodologie Agile
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  📋
                </div>
                <div>
                  <h4 class="font-semibold text-yellow mb-1">Gestion de Projet</h4>
                  <p class="text-sm text-subtext0">
                    Planification, estimation, respect des délais et livrables
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  🧪
                </div>
                <div>
                  <h4 class="font-semibold text-teal mb-1">Tests & Qualité</h4>
                  <p class="text-sm text-subtext0">
                    Tests unitaires JUnit, intégration continue, documentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-6 bg-gradient-to-r from-lavender/10 to-mauve/10">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Intéressé par ce projet ?</h2>
        <p class="text-xl text-subtext0 mb-8">
          N'hésitez pas à me contacter pour en discuter davantage ou voir d'autres projets
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/projects" 
            class="px-8 py-4 bg-surface0 border border-surface1 text-text rounded-xl font-semibold hover:border-lavender transition-colors inline-flex items-center justify-center">
            <span class="mr-2">←</span>
            Voir tous les projets
          </NuxtLink>
          <NuxtLink to="/contact" 
            class="px-8 py-4 bg-gradient-to-r from-lavender to-mauve text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-lavender/20 inline-flex items-center justify-center">
            <span class="mr-2">✉️</span>
            Me contacter
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
  title: 'Jeu Train - Java/JavaFX | Alexis RAVAT',
  meta: [
    {
      name: 'description',
      content: 'Projet universitaire (SAE) de développement du jeu Train en Java/JavaFX. Application des principes de POO et développement d\'IHM.'
    }
  ]
})

// Scroll to sections
const scrollToTech = () => {
  document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToCode = () => {
  document.getElementById('code')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.text-comment {
  color: var(--overlay0);
}
</style>