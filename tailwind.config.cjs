/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderRadius: {
				'4xl': '2rem'
			}
		}
	},
	plugins: []
};
