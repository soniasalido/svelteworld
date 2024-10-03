import adapter from '@sveltejs/adapter-netlify';  // Cambiamos a Netlify
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocesadores
	preprocess: vitePreprocess(),

	kit: {
		// Configuramos el adaptador de Netlify
		adapter: adapter()
	}
};

export default config;

