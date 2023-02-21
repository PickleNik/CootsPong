// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
// import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// prerender: {
		// 	default: true
		// },
		// adapter: adapter()
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: 'index.html'
		})
	},
	paths: {
		base: '/CootsPong'
	},
	preprocess: vitePreprocess()
	// preprocess: {
	// 	preprocess({
	//     postcss: true,
	//   }),
	// }
};

export default config;
