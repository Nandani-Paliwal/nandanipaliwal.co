import './globals.css'
import { Poppins } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import StandardLayout from '~/Components/layouts/standard-layout'
import { siteDescription } from '~/constant'

const poppins = Poppins({
	weight: '400',
	subsets: ['latin'],
	display: 'swap'
})

export const viewport: Viewport = {
	themeColor: {
		color: '#06b6d4'
	},
	colorScheme: 'light',
	width: 'device-width',
	initialScale: 1
}

export const metadata: Metadata = {
	title: 'nandanipaliwal',
	description: siteDescription,
	applicationName: 'nandanipaliwal',
	authors: [{ name: 'Nandani Paliwal', url: 'https://nandanipaliwal.co/' }],
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	keywords: [
		'innovation',
		'product development',
		'collaboration',
		'business growth',
		'project success',
		'custom solutions'
	],

	publisher: 'nandanipaliwal',
	robots: 'index, follow',
	creator: 'Nandani Paliwal',
	manifest: 'https://nandanipaliwal.com/manifest.json',
	openGraph: {
		type: 'website',
		url: 'https://nandanipaliwal.com',
		title: 'nandanipaliwal',
		description: siteDescription,
		images: [{ url: 'https://nandanipaliwal.com/open-graph.png' }],
		siteName: 'nandanipaliwal'
	},
	twitter: {
		card: 'summary_large_image',
		site: '@nandanipaliwal',
		description: siteDescription,
		title: 'nandanipaliwal',
		creator: '@nandanipaliwal',
		images: 'https://nandanipaliwal.com/twitter-og.png'
	},
	verification: {
		google: 'mrOKVGMry1NOe6Hrn1lXqy0dYcuAqNVbiDr5HeSfRWo'
	},
	formatDetection: { telephone: false },
	appleWebApp: true,
	assets: 'https://nandanipaliwal.com/assets',
	category: 'Innovation, Product Development, Business Solutions',
	classification: 'Innovative Development Agency',
	other: {
		'X-UA-Compatible': 'IE=edge,chrome=1',
		'mobile-web-app-capable': 'yes'
	},
	metadataBase: new URL('https://nandanipaliwal.co'),
	icons: [
		{ rel: 'icon', url: 'https://nandanipaliwal.com/favicon.ico' },
		{ rel: 'apple-touch-icon', url: 'https://nandanipaliwal.com/apple-icon.png' }
	]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="light min-h-screen" style={{ colorScheme: 'light' }}>
			<body className={`min-h-screen ${poppins.className}`}>
				<StandardLayout>{children}</StandardLayout>
			</body>
		</html>
	)
}
