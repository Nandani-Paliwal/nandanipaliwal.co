import { type MetadataRoute } from 'next'
import { ProductDescription } from '~/constant'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Nandani Paliwal',
		short_name: 'Nandani',
		description: ProductDescription,
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#f16232',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon'
			}
		]
	}
}
