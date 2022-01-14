import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify } from 'unocss';
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

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
			resolve: {
				alias: {
					$stores: path.resolve('src/stores/')
				}
			},
			plugins: [
				process.env.NODE_ENV === 'production' && optimizeCss(),
				Unocss({
					presets: [presetUno()]
				}),
				AutoImport({
					dts: 'src/auto-imports.d.ts',
					imports: [
						'svelte',
						'svelte/animate',
						'svelte/easing',
						'svelte/motion',
						'svelte/store',
						'svelte/transition',
						{
							$lib: ['supabase']
						}
					]
				})
			]
		}
	}
};

export default config;
