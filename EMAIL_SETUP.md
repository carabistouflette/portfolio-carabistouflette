# Configuration de l'envoi d'emails

Le formulaire de contact utilise l'API Resend pour envoyer des emails à `arobin9999@gmail.com`.

## Configuration requise

1. **Créer un compte Resend**
   - Aller sur [resend.com](https://resend.com)
   - Créer un compte gratuit
   - Récupérer votre API key

2. **Configurer l'API key dans Cloudflare Pages**
   ```bash
   # Pour l'environnement de production
   wrangler pages secret put RESEND_API_KEY
   # Entrer votre API key quand demandé
   ```

3. **Pour le développement local**
   Créer un fichier `.env` à la racine du projet:
   ```
   RESEND_API_KEY=votre_api_key_ici
   ```

## Test local

Pour tester en local avec l'API key:
```bash
RESEND_API_KEY=votre_api_key npm run dev
```

## Note importante

- L'email sera envoyé depuis `onboarding@resend.dev` (domaine par défaut de Resend)
- Pour utiliser votre propre domaine, vous devez le vérifier dans Resend
- Les emails sont envoyés à `arobin9999@gmail.com`