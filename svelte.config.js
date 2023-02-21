// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
// import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	prerender: {
		default: true
	},
	kit: {
		// adapter: adapter()
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: 'index.html',
			strict: true
		}),
		paths: {
			base: '/CootsPong'
		}
		// appDir: 'CootsPong'
	},
	preprocess: vitePreprocess({
		postcss: true
	})
	// preprocess: {
	// 	preprocess({
	//     postcss: true,
	//   }),
	// }
};

export default config;
