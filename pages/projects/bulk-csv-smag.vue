<template>
  <div class="min-h-screen">
    <!-- Hero Section avec timeline du stage -->
    <section class="section-padding bg-gradient-to-b from-mantle to-base relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-64 h-64 bg-green rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue rounded-full blur-3xl"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-surface0/50 backdrop-blur px-4 py-2 rounded-full mb-6 animate-slide-up">
            <Icon name="heroicons:building-office" class="w-5 h-5 text-green" />
            <span class="text-sm">Stage chez SMAG • 30 janvier - 25 mars 2025</span>
          </div>
          
          <h1 class="mb-6 animate-slide-up animation-delay-100">Gestionnaire de Bulk CSV SMAG</h1>
          <p class="text-xl text-subtext0 mb-8 animate-slide-up animation-delay-200">
            Application complète de gestion de fichiers CSV volumineux développée durant mon stage de 2ème année de BUT Informatique
          </p>
          
          <div class="flex flex-wrap gap-3 justify-center animate-slide-up animation-delay-300">
            <span class="px-3 py-1 bg-green/20 text-green rounded-full text-sm font-medium">Vue.js 3</span>
            <span class="px-3 py-1 bg-blue/20 text-blue rounded-full text-sm font-medium">TypeScript</span>
            <span class="px-3 py-1 bg-yellow/20 text-yellow rounded-full text-sm font-medium">Python</span>
            <span class="px-3 py-1 bg-mauve/20 text-mauve rounded-full text-sm font-medium">FastAPI</span>
            <span class="px-3 py-1 bg-peach/20 text-peach rounded-full text-sm font-medium">Pandas</span>
            <span class="px-3 py-1 bg-lavender/20 text-lavender rounded-full text-sm font-medium">Docker</span>
            <span class="px-3 py-1 bg-sky/20 text-sky rounded-full text-sm font-medium">Kubernetes</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contexte et objectifs -->
    <section class="section-padding">
      <div class="container-custom max-w-6xl">
        <h2 class="mb-12 text-center">Contexte du stage</h2>
        
        <div class="grid lg:grid-cols-2 gap-8 mb-12">
          <Card class="h-full">
            <div class="p-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-green/20 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:building-office-2" class="w-6 h-6 text-green" />
                </div>
                <h3 class="text-xl">L'entreprise SMAG</h3>
              </div>
              <p class="text-subtext0 mb-4">
                SMAG est une entreprise spécialisée dans les solutions numériques pour l'agriculture. 
                Elle gère quotidiennement d'importantes quantités de données sous forme de fichiers CSV 
                nécessitant des traitements complexes et des jointures multiples.
              </p>
              <div class="mt-6 space-y-2">
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:user" class="w-4 h-4 text-overlay0" />
                  <span class="text-sm"><strong>Direction :</strong> Thomas Voisin & Guilhem Besse</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:user" class="w-4 h-4 text-overlay0" />
                  <span class="text-sm"><strong>DRH :</strong> Aurélie Lhermitte</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card class="h-full">
            <div class="p-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:light-bulb" class="w-6 h-6 text-blue" />
                </div>
                <h3 class="text-xl">Problématique</h3>
              </div>
              <p class="text-subtext0 mb-4">
                Les équipes de SMAG devaient gérer manuellement des fichiers CSV volumineux avec des 
                structures complexes, nécessitant des jointures fréquentes et des transformations de données. 
                Ce processus était chronophage et source d'erreurs.
              </p>
              <div class="bg-surface0 rounded-lg p-4 mt-4">
                <p class="text-sm text-red mb-2">Défis identifiés :</p>
                <ul class="text-sm space-y-1 text-subtext0">
                  <li>• Volume important de données (fichiers > 1GB)</li>
                  <li>• Jointures complexes entre multiples CSV</li>
                  <li>• Absence d'interface utilisateur intuitive</li>
                  <li>• Temps de traitement élevé</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <!-- Encadrement -->
        <div class="bg-mantle rounded-2xl p-8 mb-12">
          <h3 class="text-xl mb-6 text-center">Encadrement du stage</h3>
          <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div class="text-center">
              <div class="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:academic-cap" class="w-10 h-10 text-green" />
              </div>
              <h4 class="font-semibold mb-2">Gilles Bégué</h4>
              <p class="text-sm text-subtext0">Product Manager Tribu Core</p>
              <p class="text-xs text-overlay0 mt-1">Tuteur de stage entreprise</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:academic-cap" class="w-10 h-10 text-blue" />
              </div>
              <h4 class="font-semibold mb-2">Matthieu Rosenfeld</h4>
              <p class="text-sm text-subtext0">IUT de Montpellier</p>
              <p class="text-xs text-overlay0 mt-1">Superviseur académique</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution développée -->
    <section class="section-padding bg-surface0">
      <div class="container-custom max-w-6xl">
        <h2 class="mb-12 text-center">Solution développée</h2>
        
        <!-- Architecture interactive -->
        <div class="mb-12">
          <div class="flex flex-wrap gap-2 justify-center mb-8">
            <button
              v-for="tab in architectureTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-4 py-2 rounded-lg transition-all"
              :class="activeTab === tab.id ? 'bg-green text-base' : 'bg-surface1 hover:bg-surface2'"
            >
              {{ tab.label }}
            </button>
          </div>
          
          <div class="bg-base rounded-2xl p-8 min-h-[400px]">
            <!-- Vue d'ensemble -->
            <div v-show="activeTab === 'overview'" class="space-y-6">
              <h3 class="text-xl mb-4">Architecture globale</h3>
              <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="w-24 h-24 bg-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="heroicons:computer-desktop" class="w-12 h-12 text-green" />
                  </div>
                  <h4 class="font-semibold mb-2">Frontend</h4>
                  <p class="text-sm text-subtext0">Interface moderne et réactive avec Vue.js 3 et TypeScript</p>
                </div>
                <div class="text-center">
                  <div class="w-24 h-24 bg-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="heroicons:server" class="w-12 h-12 text-blue" />
                  </div>
                  <h4 class="font-semibold mb-2">Backend</h4>
                  <p class="text-sm text-subtext0">API performante avec Python et FastAPI</p>
                </div>
                <div class="text-center">
                  <div class="w-24 h-24 bg-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="heroicons:cloud" class="w-12 h-12 text-yellow" />
                  </div>
                  <h4 class="font-semibold mb-2">Infrastructure</h4>
                  <p class="text-sm text-subtext0">Déploiement containerisé avec Docker et Kubernetes</p>
                </div>
              </div>
              
              <div class="bg-surface0 rounded-lg p-6 mt-6">
                <h4 class="font-semibold mb-3 text-lavender">Principes SOLID appliqués</h4>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start gap-2">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-green mt-0.5" />
                    <span><strong>Single Responsibility :</strong> Chaque module a une responsabilité unique</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-green mt-0.5" />
                    <span><strong>Open/Closed :</strong> Architecture extensible sans modification du code existant</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-green mt-0.5" />
                    <span><strong>Dependency Inversion :</strong> Utilisation d'interfaces pour découpler les modules</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Frontend -->
            <div v-show="activeTab === 'frontend'" class="space-y-6">
              <h3 class="text-xl mb-4">Frontend - Interface utilisateur</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-3 text-green">Technologies</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <Icon name="logos:vue" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>Vue.js 3</strong>
                        <p class="text-sm text-subtext0">Framework progressif avec Composition API</p>
                      </div>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="logos:typescript-icon" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>TypeScript</strong>
                        <p class="text-sm text-subtext0">Typage statique pour une meilleure maintenabilité</p>
                      </div>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="logos:vitejs" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>Vite</strong>
                        <p class="text-sm text-subtext0">Build tool moderne pour des performances optimales</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-3 text-blue">Fonctionnalités clés</h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Upload drag & drop de fichiers CSV</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Prévisualisation des données en temps réel</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Interface de configuration des jointures</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Export des résultats en multiple formats</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Tableau de bord avec statistiques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Backend -->
            <div v-show="activeTab === 'backend'" class="space-y-6">
              <h3 class="text-xl mb-4">Backend - Traitement des données</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-3 text-yellow">Stack technique</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <Icon name="logos:python" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>Python 3.11</strong>
                        <p class="text-sm text-subtext0">Langage principal pour le traitement des données</p>
                      </div>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="simple-icons:fastapi" class="w-6 h-6 mt-0.5 text-green" />
                      <div>
                        <strong>FastAPI</strong>
                        <p class="text-sm text-subtext0">Framework moderne pour APIs haute performance</p>
                      </div>
                    </li>
                    <li class="flex items-start gap-3">
                      <Icon name="simple-icons:pandas" class="w-6 h-6 mt-0.5 text-blue" />
                      <div>
                        <strong>Pandas</strong>
                        <p class="text-sm text-subtext0">Manipulation efficace des données CSV volumineuses</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-3 text-mauve">Fonctionnalités backend</h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Traitement de fichiers CSV volumineux</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Jointures automatiques intelligentes</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Validation et nettoyage des données</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon name="heroicons:check" class="w-4 h-4 text-green" />
                      <span>Export multi-formats</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-surface0 rounded-lg p-6 mt-6">
                <h4 class="font-semibold mb-3">Optimisations implémentées</h4>
                <ul class="grid md:grid-cols-2 gap-3 text-sm">
                  <li class="flex items-center gap-2">
                    <Icon name="heroicons:bolt" class="w-4 h-4 text-yellow" />
                    <span>Traitement asynchrone des gros fichiers</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon name="heroicons:cpu-chip" class="w-4 h-4 text-yellow" />
                    <span>Utilisation du multiprocessing</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 text-yellow" />
                    <span>Mise en cache intelligente</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Icon name="heroicons:shield-check" class="w-4 h-4 text-yellow" />
                    <span>Validation des données en streaming</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- DevOps -->
            <div v-show="activeTab === 'devops'" class="space-y-6">
              <h3 class="text-xl mb-4">Infrastructure & Déploiement</h3>
              
              <div class="bg-surface0 rounded-lg p-6 mb-6">
                <h4 class="font-semibold mb-4 text-lavender">Pipeline CI/CD</h4>
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div 
                    v-for="(step, index) in cicdSteps" 
                    :key="index"
                    class="flex items-center gap-3"
                  >
                    <div class="flex items-center">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="step.color">
                        <Icon :name="step.icon" class="w-6 h-6" />
                      </div>
                      <div v-if="index < cicdSteps.length - 1" class="hidden md:block w-20 h-0.5 bg-overlay0/30 ml-3"></div>
                    </div>
                    <div>
                      <p class="font-medium text-sm">{{ step.title }}</p>
                      <p class="text-xs text-subtext0">{{ step.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-3 text-sky">Containerisation</h4>
                  <div class="bg-surface0 rounded-lg p-4 space-y-3">
                    <div class="flex items-start gap-3">
                      <Icon name="logos:docker-icon" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>Docker</strong>
                        <p class="text-sm text-subtext0">Images optimisées multi-stage</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <Icon name="vscode-icons:file-type-docker" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>Docker Compose</strong>
                        <p class="text-sm text-subtext0">Orchestration locale pour le développement</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold mb-3 text-peach">Orchestration</h4>
                  <div class="bg-surface0 rounded-lg p-4 space-y-3">
                    <div class="flex items-start gap-3">
                      <Icon name="logos:kubernetes" class="w-6 h-6 mt-0.5" />
                      <div>
                        <strong>Kubernetes</strong>
                        <p class="text-sm text-subtext0">Déploiement scalable en production</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <Icon name="simple-icons:helm" class="w-6 h-6 mt-0.5 text-blue" />
                      <div>
                        <strong>Helm Charts</strong>
                        <p class="text-sm text-subtext0">Gestion des configurations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Résultats et impact -->
    <section class="section-padding">
      <div class="container-custom max-w-6xl">
        <h2 class="mb-12 text-center">Résultats & Impact</h2>
        
        <div class="grid md:grid-cols-4 gap-6 mb-12">
          <div class="text-center">
            <div class="text-4xl font-bold text-green mb-2">-75%</div>
            <p class="text-sm text-subtext0">Temps de traitement</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue mb-2">100%</div>
            <p class="text-sm text-subtext0">Automatisation des jointures</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-yellow mb-2">5x</div>
            <p class="text-sm text-subtext0">Vitesse de traitement</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-mauve mb-2">0</div>
            <p class="text-sm text-subtext0">Erreurs de manipulation</p>
          </div>
        </div>
        
        <!-- Timeline du projet -->
        <div class="bg-mantle rounded-2xl p-8">
          <h3 class="text-xl mb-6 text-center">Chronologie du projet</h3>
          <div class="space-y-6">
            <div 
              v-for="(phase, index) in projectPhases" 
              :key="index"
              class="flex gap-4"
            >
              <div class="flex flex-col items-center">
                <div class="w-4 h-4 rounded-full" :class="phase.color"></div>
                <div v-if="index < projectPhases.length - 1" class="w-0.5 h-full bg-overlay0/30 mt-2"></div>
              </div>
              <div class="flex-1 pb-6">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold">{{ phase.title }}</h4>
                  <span class="text-xs text-overlay0 bg-surface0 px-2 py-1 rounded">{{ phase.duration }}</span>
                </div>
                <p class="text-sm text-subtext0 mb-2">{{ phase.description }}</p>
                <ul class="text-xs space-y-1">
                  <li v-for="task in phase.tasks" :key="task" class="flex items-center gap-2">
                    <Icon name="heroicons:check" class="w-3 h-3 text-green" />
                    <span>{{ task }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Remerciements -->
        <div class="mt-12 text-center">
          <h3 class="text-2xl mb-6">Remerciements</h3>
          <p class="text-subtext0 max-w-3xl mx-auto mb-8">
            Je tiens à remercier toutes les personnes qui ont contribué au succès de ce stage et m'ont permis 
            d'acquérir une expérience précieuse dans le développement d'applications d'entreprise.
          </p>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card class="text-center">
              <div class="p-4">
                <Icon name="heroicons:academic-cap" class="w-8 h-8 text-blue mx-auto mb-2" />
                <p class="font-semibold text-sm">IUT de Montpellier</p>
                <p class="text-xs text-subtext0">Formation d'excellence</p>
              </div>
            </Card>
            <Card class="text-center">
              <div class="p-4">
                <Icon name="heroicons:user-group" class="w-8 h-8 text-green mx-auto mb-2" />
                <p class="font-semibold text-sm">Direction SMAG</p>
                <p class="text-xs text-subtext0">Pour leur confiance</p>
              </div>
            </Card>
            <Card class="text-center">
              <div class="p-4">
                <Icon name="heroicons:sparkles" class="w-8 h-8 text-yellow mx-auto mb-2" />
                <p class="font-semibold text-sm">Gilles Bégué</p>
                <p class="text-xs text-subtext0">Encadrement exemplaire</p>
              </div>
            </Card>
            <Card class="text-center">
              <div class="p-4">
                <Icon name="heroicons:heart" class="w-8 h-8 text-red mx-auto mb-2" />
                <p class="font-semibold text-sm">Équipe SMAG</p>
                <p class="text-xs text-subtext0">Accueil chaleureux</p>
              </div>
            </Card>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="text-center mt-12">
          <h3 class="text-2xl mb-4">Ce projet vous intéresse ?</h3>
          <p class="text-subtext0 mb-6">
            N'hésitez pas à me contacter pour discuter de projets similaires ou en savoir plus sur mon expérience.
          </p>
          <div class="flex gap-4 justify-center">
            <Button to="/contact" variant="solid" iconRight="heroicons:arrow-right">
              Me contacter
            </Button>
            <Button to="/projects" variant="outline" iconLeft="heroicons:arrow-left">
              Voir d'autres projets
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSeoMeta } from '#imports'

// State for tabs
const activeTab = ref('overview')

const architectureTabs = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'devops', label: 'DevOps' }
]

// CI/CD Steps
const cicdSteps = [
  { 
    title: 'Code', 
    desc: 'Push Git',
    icon: 'heroicons:code-bracket',
    color: 'bg-green/20 text-green'
  },
  { 
    title: 'Build', 
    desc: 'Docker',
    icon: 'heroicons:cube',
    color: 'bg-blue/20 text-blue'
  },
  { 
    title: 'Test', 
    desc: 'Automatisé',
    icon: 'heroicons:check-badge',
    color: 'bg-yellow/20 text-yellow'
  },
  { 
    title: 'Deploy', 
    desc: 'Kubernetes',
    icon: 'heroicons:rocket-launch',
    color: 'bg-mauve/20 text-mauve'
  }
]

// Project phases
const projectPhases = [
  {
    title: 'Phase 1 : Analyse et conception',
    duration: '2 semaines',
    description: 'Étude des besoins et conception de l\'architecture',
    color: 'bg-green',
    tasks: [
      'Analyse des processus existants',
      'Interviews des utilisateurs',
      'Conception de l\'architecture',
      'Choix des technologies'
    ]
  },
  {
    title: 'Phase 2 : Développement du Backend',
    duration: '3 semaines',
    description: 'Implémentation de l\'API et du traitement des données',
    color: 'bg-blue',
    tasks: [
      'Setup FastAPI',
      'Développement des endpoints',
      'Intégration Pandas',
      'Tests unitaires'
    ]
  },
  {
    title: 'Phase 3 : Développement du Frontend',
    duration: '2 semaines',
    description: 'Création de l\'interface utilisateur',
    color: 'bg-yellow',
    tasks: [
      'Setup Vue.js 3 + TypeScript',
      'Composants UI',
      'Intégration API',
      'Tests E2E'
    ]
  },
  {
    title: 'Phase 4 : Déploiement et documentation',
    duration: '1 semaine',
    description: 'Mise en production et transfert de compétences',
    color: 'bg-mauve',
    tasks: [
      'Containerisation Docker',
      'Déploiement Kubernetes',
      'Documentation technique',
      'Formation utilisateurs'
    ]
  }
]

// SEO
useSeoMeta({
  title: 'Gestionnaire de Bulk CSV SMAG - Stage 2ème année BUT',
  description: 'Développement d\'une application complète de gestion de fichiers CSV volumineux durant mon stage chez SMAG. Stack : Vue.js, TypeScript, Python, FastAPI, Docker, Kubernetes.',
  ogTitle: 'Projet de stage SMAG - Gestionnaire Bulk CSV',
  ogDescription: 'Application full-stack développée durant mon stage de 2ème année de BUT Informatique chez SMAG.'
})
</script>

<style scoped>
.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}
</style>