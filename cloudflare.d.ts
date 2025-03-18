// Types pour l'environnement Cloudflare Workers

/// <reference types="@cloudflare/workers-types" />

// Étend l'environnement global pour Cloudflare Workers
declare global {
    const ENVIRONMENT: string;
  }