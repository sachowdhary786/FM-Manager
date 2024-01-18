import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  define: {
    'import.meta.env': import.meta.env
  },
  integrations: [tailwind(), vue(), solidJs(), svelte()]
});