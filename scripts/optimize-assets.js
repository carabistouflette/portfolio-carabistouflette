#!/usr/bin/env node

/**
 * Script d'optimisation des ressources pour le déploiement sur Cloudflare
 * Ce script est utile pour minimiser la taille des ressources statiques
 * avant le déploiement, ce qui améliore les performances de chargement.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Déterminer le chemin de base
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Déterminer le répertoire de sortie en fonction du preset utilisé
async function getOutputDir() {
  const nuxtOutputDir = path.resolve(__dirname, '../.output/public');
  const cloudflareOutputDir = path.resolve(__dirname, '../dist');
  
  // Vérifier quel répertoire existe
  try {
    await fs.access(cloudflareOutputDir);
    console.log('📂 Utilisation du répertoire Cloudflare: dist/');
    return cloudflareOutputDir;
  } catch {
    try {
      await fs.access(nuxtOutputDir);
      console.log('📂 Utilisation du répertoire Nuxt: .output/public/');
      return nuxtOutputDir;
    } catch {
      throw new Error('Aucun répertoire de sortie trouvé');
    }
  }
}

/**
 * Optimisation des images
 */
async function optimizeImages(outputDir) {
  try {
    console.log('🔍 Recherche des images...');
    const imageFiles = [
      ...(await findFiles(outputDir, '.jpg')), 
      ...(await findFiles(outputDir, '.jpeg')),
      ...(await findFiles(outputDir, '.png'))
    ];
    
    console.log(`🧪 Optimisation de ${imageFiles.length} images...`);
    
    for (const file of imageFiles) {
      if (file.endsWith('.png')) {
// Use OptiPNG for lossless PNG optimization. '-o5' sets the optimization level.
        await execAsync(`npx optipng -o5 ${file}`);
      } else {
// Use MozJPEG for lossy JPEG optimization (overwrites the original file).
        await execAsync(`npx mozjpeg -optimize -outfile ${file} ${file}`);
      }
    }
    
    console.log('✅ Optimisation des images terminée!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation des images:', error);
  }
}

/**
 * Trouver les fichiers avec une extension spécifique
 */
async function findFiles(directory, extension) {
  const files = [];
  
// Inner recursive function to traverse directories.
  async function search(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await search(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }
  
  await search(directory);
  return files;
}

async function main() {
  console.log('🚀 Démarrage de l\'optimisation des ressources...');
  
  let outputDir;
  try {
    // Déterminer le bon répertoire de sortie
    outputDir = await getOutputDir();
  } catch (error) {
    console.error('❌ Aucun répertoire de sortie trouvé');
    console.error('Exécutez d\'abord "npm run build" ou "npm run cf:build"');
    process.exit(1);
  }
  
  // Décommentez la ligne suivante si vous avez installé les dépendances nécessaires
  // pour l'optimisation des images (optipng-bin et mozjpeg)
  await optimizeImages(outputDir);
  
  console.log('🎉 Toutes les optimisations sont terminées!');
}

main().catch(error => {
  console.error('Erreur globale:', error);
  process.exit(1);
});