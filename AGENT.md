# Agent Instructions for Festa Website

## Commands
- **Dev server**: `npm run dev` or `astro dev`
- **Build**: `npm run build` or `astro build`
- **Preview**: `npm run preview` or `astro preview`
- **Format**: `prettier --write .` (uses prettier-plugin-astro and prettier-plugin-tailwindcss)

## Code Style
- **Framework**: Astro + Vue 3 + TailwindCSS
- **TypeScript**: Strict mode enabled, use `@/` alias for src imports
- **Imports**: Use relative imports for components, `astro:content` for collections
- **Vue**: Composition API with `<script setup>`, TypeScript props with object syntax
- **Astro**: Frontmatter with `---`, use `getCollection()` for content
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Client directives**: Use `client:only="vue"` for Vue components needing hydration
- **Styling**: TailwindCSS classes, responsive design with mobile-first approach
- **Content**: Define collections in `content.config.ts` with Zod schemas
- **File structure**: Components in `/components`, pages in `/pages`, content collections in `/content`

## Architecture
- Astro SSG with Vue islands for interactivity
- Content collections for data management
- Netlify deployment configuration