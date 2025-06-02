# 🚀 Intégration GitHub Dynamique

## Vue d'ensemble

J'ai ajouté une intégration complète avec l'API GitHub pour afficher des statistiques en temps réel dans votre portfolio. Voici ce qui a été implémenté :

## 🎯 Fonctionnalités ajoutées

### 1. **Composable useGitHub**
- Récupération des données utilisateur GitHub
- Récupération des repos et statistiques
- Gestion du cache (1 heure)
- Support des tokens GitHub pour augmenter les limites

### 2. **Composant GitHubStats**
- Affichage des statistiques principales (repos, stars, forks, followers)
- Graphique des langages les plus utilisés
- Activité récente (commits, PRs, issues)
- Animations et design moderne

### 3. **Badges GitHub sur les projets**
- Affichage automatique des stars et forks
- Langage principal du projet
- Liens directs vers GitHub

### 4. **Endpoints serveur sécurisés**
- `/api/github/[username]` - Données utilisateur et repos
- `/api/github/repo/[owner]/[repo]` - Données d'un repo spécifique
- Cache automatique pour optimiser les performances

## 🔧 Configuration

### 1. **Token GitHub (optionnel mais recommandé)**
Pour éviter les limites de taux de l'API GitHub, ajoutez un token dans votre `.env` :

```bash
# .env
GITHUB_TOKEN=ghp_votre_token_ici
```

Pour créer un token :
1. Allez sur GitHub → Settings → Developer settings → Personal access tokens
2. Créez un token avec les permissions `public_repo` et `read:user`

### 2. **Ajouter les repos GitHub aux projets**
Dans vos données de projets, ajoutez la propriété `githubRepo` :

```typescript
const projects = [
  {
    id: 'mon-projet',
    title: 'Mon Projet',
    description: '...',
    technologies: ['Vue', 'TypeScript'],
    githubRepo: 'carabistouflette/mon-projet', // Format: owner/repo
    // ...
  }
]
```

### 3. **Personnaliser l'affichage**
- Le composant `GitHubStats` s'affiche automatiquement dans la section About
- Vous pouvez le désactiver en passant `showGitHubStats: false`
- Le username par défaut est `carabistouflette`, modifiable dans les props

## 🎨 Utilisation

### Dans la section About (déjà intégré)
```vue
<AboutSection 
  :title="title"
  :aboutText="aboutText"
  :skills="skills"
  :showGitHubStats="true"
/>
```

### Utilisation standalone
```vue
<GitHubStats username="carabistouflette" :compact="false" />
```

### Dans les cartes de projets (déjà intégré)
Les badges s'affichent automatiquement si `githubRepo` est défini.

## 🚀 Améliorations futures possibles

1. **Graphiques de contributions**
   - Heatmap style GitHub
   - Statistiques de commits par jour

2. **Intégration plus poussée**
   - README des projets
   - Issues ouvertes
   - Pull requests récentes

3. **Analytics**
   - Évolution des stars dans le temps
   - Langages par projet
   - Activité par mois

4. **Social**
   - Followers récents
   - Organisations
   - Projets contributeurs

## 📝 Notes importantes

- Les données sont mises en cache pendant 1 heure
- Sans token, limite de 60 requêtes/heure
- Avec token, limite de 5000 requêtes/heure
- Les erreurs sont gérées gracieusement (affichage d'un message)

## 🎯 Résultat

Votre portfolio affiche maintenant :
- ✅ Vos statistiques GitHub globales
- ✅ Les stars/forks de chaque projet
- ✅ Votre activité récente
- ✅ Les langages que vous utilisez le plus

Le tout avec des animations fluides et un design qui s'intègre parfaitement à votre thème Catppuccin ! 🎨