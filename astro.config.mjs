import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  define: {'import.meta.env': import.meta.env,},
  integrations: [tailwind(), vue()]
});