# Alexis Robin's Portfolio

This project is a personal portfolio website built with Nuxt 3, Vue 3, and Tailwind CSS, showcasing skills, experience, and projects. It features a clean design inspired by the Catppuccin theme.

## ✨ Features

*   **Framework:** Built with [Nuxt 3](https://nuxt.com/) (v3.16+) and [Vue 3](https://vuejs.org/).
*   **Styling:** Styled using [Tailwind CSS](https://tailwindcss.com/) with Catppuccin Mocha theme.
*   **TypeScript:** Fully typed codebase for enhanced maintainability.
*   **Responsive Design:** Adapts seamlessly to various screen sizes (desktop, tablet, mobile).
*   **Contact Form:** Features a functional contact form with server-side validation (using Nuxt server routes).
*   **SEO Enhancements:** Optimized for search engines with sitemap generation, meta tags, and Schema.org integration.
*   **Security:** Implements security headers via `public/_headers`.
*   **Asset Optimization:** Includes scripts for optimizing images (`scripts/optimize-assets.js`).
*   **Animations:** Subtle animations using `@vueuse/motion`.

## 📂 Project Structure

The project follows the standard Nuxt 3 directory structure:

```
portfolio-carabistouflette/
├── assets/               # Static assets (CSS, fonts, etc.)
├── components/           # Reusable Vue components (UI, layout, page-specific)
├── composables/          # Reusable Vue composables (e.g., useTheme, useAnimations)
├── layouts/              # Application layout definitions
├── pages/                # Application pages and routes
├── public/               # Static files served directly (favicon, robots.txt, _headers)
├── server/               # Server-side API routes and middleware (e.g., contact form endpoint)
├── scripts/              # Utility scripts (e.g., asset optimization)
├── .nuxt/                # Nuxt build directory (auto-generated)
├── node_modules/         # Project dependencies (auto-generated)
├── nuxt.config.ts        # Main Nuxt configuration file
├── nuxt.config.cloudflare.ts # Specific Nuxt config overrides for Cloudflare
├── package.json          # Project metadata and dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── wrangler.toml         # Cloudflare Wrangler configuration
└── README.md             # This file
```

## prerequisites

*   **Node.js:** v18.x or later recommended.
*   **Package Manager:** [npm](https://www.npmjs.com/) (comes with Node.js).

## 🚀 Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/portfolio-carabistouflette.git # Replace with actual repo URL if different
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd portfolio-carabistouflette
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

## 💻 Development

To run the development server with hot-reloading:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## 📦 Build

*   **Standard Build (for Node.js hosting or pre-rendering):**
    This command builds the Nuxt application and optimizes assets.
    ```bash
    npm run build
    ```
    The output will be in the `.output/` directory.

*   **Static Site Generation (SSG):**
    This command pre-renders all pages into static HTML files and optimizes assets.
    ```bash
    npm run generate
    ```
    The output will be in the `.output/public/` directory, suitable for static hosting.

## ☁️ Deployment (Cloudflare Pages)

This project is configured for optimal deployment to [Cloudflare Pages](https://pages.cloudflare.com/).

1.  **Build for Cloudflare:**
    This command uses the specific Cloudflare preset (`NITRO_PRESET=cloudflare-pages`) defined in `nuxt.config.cloudflare.ts` and optimizes assets.
    ```bash
    npm run cf:build
    ```

2.  **Deploy via Wrangler CLI:**
    Ensure you have [Wrangler](https://developers.cloudflare.com/workers/wrangler/get-started/) installed and configured.
    ```bash
    # Deploy the generated static assets
    wrangler pages deploy .output/public
    ```
    Alternatively, connect your Git repository directly to Cloudflare Pages for automatic deployments.

3.  **Environment Variables:**
    You may need to configure environment variables in the Cloudflare Pages dashboard, such as:
    *   `NUXT_PUBLIC_SITE_URL`: The public URL of your deployed site (e.g., `https://your-portfolio.pages.dev`). This is often used for SEO features like the sitemap.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue to discuss a bug or feature request, or submit a pull request.

---

Developed by Alexis Robin.