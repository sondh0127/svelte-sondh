import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'
import { optimizeImports, optimizeCss } from "carbon-preprocess-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), optimizeImports()],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [
				Unocss({
					presets: [
						presetUno(),
					]
				}),
				process.env.NODE_ENV === "production" && optimizeCss()
			],
			server: {
				port: 4000,
				open: true,
			}
		}
	},
};

export default config;
