// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from '@astrojs/node';




// https://astro.build/config
export default defineConfig({
    adapter: node({ mode: 'standalone' }), // puedes usar edge, vercel, etc.
    integrations: [tailwind(), react()],
});
