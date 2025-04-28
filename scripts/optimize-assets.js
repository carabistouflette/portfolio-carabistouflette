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
const outputDir = path.resolve(__dirname, '../.output/public');

/**
 * Minimise les fichiers CSS
 */
async function optimizeCss() {
  try {
    console.log('🔍 Recherche des fichiers CSS...');
    const cssFiles = await findFiles(outputDir, '.css');
    console.log(`🧪 Optimisation de ${cssFiles.length} fichiers CSS...`);
    
    for (const file of cssFiles) {
// Use CSSO (CSS Optimizer) for minification.
      await execAsync(`npx csso ${file} --output ${file}`);
    }
    
    console.log('✅ Optimisation CSS terminée!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation CSS:', error);
  }
}

/**
 * Minimise les fichiers JavaScript
 */
async function optimizeJs() {
  try {
    console.log('🔍 Recherche des fichiers JS...');
    const jsFiles = await findFiles(outputDir, '.js');
    console.log(`🧪 Optimisation de ${jsFiles.length} fichiers JS...`);
    
    for (const file of jsFiles) {
      // Ignorer certains fichiers
      if (file.includes('sw.js')) continue;
      
// Use Terser for JavaScript minification and mangling.
      await execAsync(`npx terser ${file} --compress --mangle --output ${file}`);
    }
    
    console.log('✅ Optimisation JS terminée!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation JS:', error);
  }
}

/**
 * Optimisation des images
 */
async function optimizeImages() {
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
  
  try {
    // Vérifier que le dossier de sortie existe
// Ensure the build output directory exists before attempting optimizations.
    await fs.access(outputDir);
  } catch (error) {
    console.error(`❌ Le répertoire de sortie n'existe pas: ${outputDir}`);
    console.error('Exécutez d\'abord "npm run build" ou "npm run cf:build"');
    process.exit(1);
  }
  
  await optimizeCss();
  await optimizeJs();
  // Décommentez la ligne suivante si vous avez installé les dépendances nécessaires
  // pour l'optimisation des images (optipng-bin et mozjpeg)
  await optimizeImages();
  
  console.log('🎉 Toutes les optimisations sont terminées!');
}

main().catch(error => {
  console.error('Erreur globale:', error);
  process.exit(1);
});