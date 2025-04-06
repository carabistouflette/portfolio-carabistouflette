# Portfolio d'Alexis Robin

Ce projet est un portfolio personnel développé avec Nuxt 3 et inspiré par le thème Catppuccin. Il présente mes compétences, mon parcours et mes projets dans le domaine de la programmation bas niveau et des systèmes embarqués.

## Caractéristiques

- 🎨 Design élégant basé sur le thème Catppuccin
- 🚀 Développé avec Nuxt 3.16 et Vue 3
- 💪 Typé avec TypeScript
- 📱 Responsive sur tous les appareils
- ✨ Animations fluides et interactives
- 🧩 Architecture modulaire suivant les principes SOLID
- 🔍 SEO optimisé

## Structure du projet

Le projet suit une architecture modulaire avec des composants réutilisables et une séparation claire des responsabilités :

```
portfolio-alexis-robin/
├── assets/               # Ressources statiques (CSS, fonts, images)
├── components/           # Composants Vue réutilisables
│   ├── ui/               # Composants d'interface utilisateur génériques
│   ├── layout/           # Composants de mise en page
│   ├── home/             # Composants spécifiques à la page d'accueil
│   ├── projects/         # Composants liés aux projets
│   └── contact/          # Composants de la page de contact
├── composables/          # Fonctions composables Vue réutilisables
├── layouts/              # Layouts de l'application
├── pages/                # Pages de l'application
├── public/               # Fichiers publics (favicon, robots.txt)
├── server/               # Logique serveur et middleware
│   ├── middleware/       # Middleware personnalisés
│   └── plugins/          # Plugins spécifiques au serveur
├── scripts/              # Scripts utilitaires
├── types/                # Définitions TypeScript
├── utils/                # Fonctions utilitaires
```

## Pages

- **Accueil** : Présentation personnelle, compétences et parcours
- **Projets** : Galerie de projets avec filtrage par catégorie
- **Contact** : Formulaire de contact et informations personnelles

## Installation et développement

### Prérequis

- Node.js (v18+)
- npm (v9+) ou yarn ou pnpm

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-username/portfolio-alexis-robin.git
   cd portfolio-alexis-robin
   ```

2. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. Ouvrez votre navigateur à l'adresse : `http://localhost:3000`

### Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run generate` : Génère une version statique de l'application
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run lint:fix` : Corrige automatiquement les problèmes détectés par ESLint

## Configuration avancée

### Configuration TypeScript

Le projet utilise une configuration TypeScript avancée avec :

- Typage strict activé (`strict: true` dans tsconfig.json)
- Path aliases pour les imports (`@/`, `~/`)
- Définitions de types personnalisées dans `types/`
- Intégration avec Vue 3 et Nuxt 3 via `@nuxt/typescript-build`

Exemple de configuration dans `tsconfig.json` :
```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"],
      "~/*": ["./*"]
    }
  }
}
```

### Configuration Tailwind CSS

Le projet utilise Tailwind CSS avec une configuration personnalisée :

- Thème étendu avec les couleurs Catppuccin
- Configuration des breakpoints responsive
- Ajout de classes utilitaires personnalisées

Exemple de configuration dans `tailwind.config.ts` :
```ts
import { defineConfig } from 'tailwindcss'
import colors from './constants/colors'

export default defineConfig({
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
})
```

## Déploiement

### Déploiement sur Cloudflare

Le projet est configuré pour un déploiement optimal sur Cloudflare Pages et Workers :

1. Installez Wrangler (CLI de Cloudflare) :
   ```bash
   npm install -g wrangler
   ```

2. Authentifiez-vous avec votre compte Cloudflare :
   ```bash
   wrangler login
   ```

3. Configurez votre projet dans `wrangler.toml` :
   ```toml
   name = "portfolio-alexis-robin"
   compatibility_date = "2024-01-01"
   main = "./.output/server/index.mjs"
   ```

4. Déployez sur Cloudflare Pages :
   ```bash
   npm run build
   wrangler pages deploy .output/public
   ```

5. Pour déployer en tant que Worker (SSR) :
   ```bash
   npm run build
   wrangler deploy
   ```

### Déploiement sur un serveur web statique

1. Générez une version statique de l'application :
   ```bash
   npm run generate
   ```

2. Le dossier `.output/public` contient le site statique qui peut être déployé sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.)

### Déploiement sur un serveur Node.js

1. Construisez l'application :
   ```bash
   npm run build
   ```

2. Démarrez le serveur en production :
   ```bash
   node .output/server/index.mjs
   ```

## Principes de conception

Ce portfolio a été conçu en respectant les principes SOLID avec des exemples concrets :

### Single Responsibility Principle (SRP)
- `components/ui/Button.vue` : Gère uniquement le rendu et le comportement d'un bouton
- `composables/useTheme.ts` : Gère uniquement la logique du thème

### Open/Closed Principle (OCP)
- Les composants comme `ProjectCard.vue` sont extensibles via props sans modification du code existant
- Le système de thème permet d'ajouter de nouvelles variantes sans modifier le code existant

### Liskov Substitution Principle (LSP)
- Tous les composants de `components/ui/` peuvent être remplacés par leurs sous-types sans affecter le comportement
- Les composables fournissent des interfaces cohérentes quel que soit leur implémentation

### Interface Segregation Principle (ISP)
- `ContactForm.vue` utilise des interfaces spécifiques pour les données de formulaire
- Les props des composants sont spécifiques à leur usage

### Dependency Inversion Principle (DIP)
- Les composants dépendent d'abstractions via les interfaces TypeScript
- L'injection de dépendances est utilisée pour les services globaux

## Personnalisation

### Thème Catppuccin

Le thème Catppuccin est défini dans `assets/css/catppuccin.css`. Vous pouvez modifier les couleurs pour utiliser d'autres variantes de Catppuccin (Latte, Frappé, Macchiato) ou un thème entièrement différent.

### Contenu

- Pour modifier vos informations personnelles, modifiez les données dans les composants correspondants
- Pour ajouter de nouveaux projets, mettez à jour le tableau de projets dans `components/projects/ProjectsList.vue`

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer.

---

Développé avec ❤️ par Alexis Robin