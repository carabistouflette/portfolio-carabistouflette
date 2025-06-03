#!/usr/bin/env node

/**
 * Script d'optimisation des ressources pour le déploiement sur Cloudflare
 * Ce script est utile pour minimiser la taille des ressources statiques
 * avant le déploiement, ce qui améliore les performances de chargement.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Déterminer le chemin de base
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Déterminer le répertoire de sortie en fonction du preset utilisé
async function getOutputDir() {
  const nuxtOutputDir = path.resolve(__dirname, '../.output/public');
  const cloudflareOutputDir = path.resolve(__dirname, '../dist');
  
  // Vérifier quel répertoire existe
  try {
    await fs.access(cloudflareOutputDir);
    return cloudflareOutputDir;
  } catch {
    try {
      await fs.access(nuxtOutputDir);
      return nuxtOutputDir;
    } catch {
      throw new Error('Aucun répertoire de sortie trouvé');
    }
  }
}

/**
 * Optimisation des images avec Sharp
 */
async function optimizeImages(outputDir) {
  try {
    const imageFiles = [
      ...(await findFiles(outputDir, '.jpg')), 
      ...(await findFiles(outputDir, '.jpeg')),
      ...(await findFiles(outputDir, '.png')),
      ...(await findFiles(outputDir, '.webp'))
    ];
    
    for (const file of imageFiles) {
      try {
        const metadata = await sharp(file).metadata();
        
        if (file.endsWith('.png')) {
          // Optimisation PNG avec compression de niveau 9 (équivalent à OptiPNG niveau 3)
          await sharp(file)
            .png({ 
              compressionLevel: 9, 
              effort: 7,
              adaptiveFiltering: true 
            })
            .toFile(file + '.tmp');
        } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          // Optimisation JPEG avec qualité 85% (équivalent MozJPEG)
          await sharp(file)
            .jpeg({ 
              quality: 85, 
              progressive: true,
              mozjpeg: true 
            })
            .toFile(file + '.tmp');
        } else if (file.endsWith('.webp')) {
          // Optimisation WebP
          await sharp(file)
            .webp({ 
              quality: 85,
              effort: 6 
            })
            .toFile(file + '.tmp');
        }
        
        // Remplacer le fichier original si la nouvelle version est plus petite
        const originalStats = await fs.stat(file);
        const newStats = await fs.stat(file + '.tmp');
        
        if (newStats.size < originalStats.size) {
          await fs.rename(file + '.tmp', file);
        } else {
          await fs.unlink(file + '.tmp');
        }
      } catch (error) {
        // Nettoyer le fichier temporaire en cas d'erreur
        try {
          await fs.unlink(file + '.tmp');
        } catch {}
      }
    }
  } catch (error) {
    // Erreur lors de l'optimisation, mais on continue
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
  let outputDir;
  try {
    // Déterminer le bon répertoire de sortie
    outputDir = await getOutputDir();
  } catch (error) {
    process.exit(1);
  }
  
  // Optimisation des images avec Sharp
  await optimizeImages(outputDir);
}

main().catch(error => {
  process.exit(1);
});