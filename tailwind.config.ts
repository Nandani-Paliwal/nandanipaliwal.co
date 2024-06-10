import type { Config } from 'tailwindcss'
/** @type {import('tailwindcss').Config} */

const config: Config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/Components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				dark: '#222',
				secondarydark: '#17181b',
				primary: {
					50: '#FEF4F0',
					100: '#FEE4DD',
					200: '#FCCABA',
					300: '#FBAF98',
					400: '#F99576',
					500: '#F87C56',
					600: '#F54914',
					700: '#BF3308',
					800: '#7F2205',
					900: '#401103',
					950: '#220901'
				},
				secondary: {
					50: '#f8f7f4',
					100: '#eeece6',
					200: '#dcd8cc',
					300: '#c5bdac',
					400: '#b7ab98',
					500: '#9c8b73',
					600: '#8f7c67',
					700: '#786656',
					800: '#635449',
					900: '#51453d',
					950: '#2b241f'
				}
			}
			// screens: {
			//   '3xl': {'min': '1859px'},
			//   // => @media (min-width: 1536px) { ... }
			// },
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
export default config
