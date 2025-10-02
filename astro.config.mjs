// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from '@astrojs/vercel';




// https://astro.build/config
export default defineConfig({
    adapter: vercel(),
    integrations: [tailwind(), react()],
    vite: {
        resolve: {
            alias: {
                '@': new URL('./src', import.meta.url)
            }
        }
    }
});
