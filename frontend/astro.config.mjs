import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sonalain.dev',
  integrations: [tailwind()],
  output: 'static',
  compressHTML: true,
});
