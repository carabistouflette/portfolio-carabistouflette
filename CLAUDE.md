# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Run development server (standard Nuxt)
- `npm run cf:dev` - Run development server with Cloudflare Pages preset

### Building
- `npm run build` - Production build with automatic asset optimization
- `npm run cf:build` - Build specifically for Cloudflare deployment
- `npm run generate` - Generate static site with asset optimization

### Linting
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues

### Deployment
- `npm run cf:preview` - Preview Cloudflare deployment locally
- `npm run cf:deploy` - Build and deploy to Cloudflare Pages

## Architecture Overview

This is a Nuxt 3 portfolio application optimized for Cloudflare Pages deployment. Key architectural decisions:

### Tech Stack
- **Framework**: Nuxt 3 with Vue 3
- **Styling**: Tailwind CSS with Catppuccin Mocha theme
- **TypeScript**: Strict mode enabled
- **Animations**: VueUse Motion library

### Configuration Strategy
The project uses dual configuration:
1. `nuxt.config.ts` - Base configuration for all environments
2. `nuxt.config.cloudflare.ts` - Production overrides for Cloudflare deployment (selective component loading, bundle optimization)

### Color System
- Catppuccin Mocha color palette
- Color constants centralized in `constants/colors.ts`

### Component Organization
Components are feature-grouped rather than type-grouped:
- `components/contact/` - Contact page components
- `components/home/` - Homepage components  
- `components/layout/` - Global layout components
- `components/projects/` - Project showcase components
- `components/ui/` - Base UI components (globally registered)

### Security Configuration
Comprehensive security headers in `public/_headers`:
- Content Security Policy (CSP)
- HSTS with preload
- X-Frame-Options: DENY
- Strict referrer and permissions policies

### Asset Optimization
Post-build optimization script (`scripts/optimize-assets.js`) automatically:
- Compresses images with MozJPEG (85% quality)
- Optimizes PNGs with OptiPNG (level 3)
- Runs after `build` and `generate` commands

### Deployment
Cloudflare Pages deployment via Wrangler:
- Configuration in `wrangler.toml`
- Environment variables for production/preview
- Output directory: `.output/public`

## Development Guidelines
- Don't push or commit the changes without user approval