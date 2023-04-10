/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['"Source Code Pro"', "sans-serif"]
		},
		extend: {
			keyframes: {
				shift: {
					'0%': { transform: 'translate(0, 0)' },
					'100%': { transform: 'translate(-45%, 0)' },
				},
				zoom: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(100)' },
				},
				shake: {
					'10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
					'20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
					'30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
					'40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
				}
			},
			animation: {
				shift: 'shift 1s ease-in-out forwards',
				zoom: 'zoom 1s ease-in-out forwards',
				shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
			}
		},
	},
	plugins: [
		function groupPeer({ addVariant }) {
			let pseudoVariants = [
				// ... Any other pseudo variants you want to support. 
				// See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
				"checked",
			].map((variant) =>
				Array.isArray(variant) ? variant : [variant, `&:${variant}`],
			);

			for (let [variantName, state] of pseudoVariants) {
				addVariant(`group-peer-${variantName}`, (ctx) => {
					let result = typeof state === "function" ? state(ctx) : state;
					return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &");
				});
			}
		},
	],
}
