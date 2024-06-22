import './globals.css'
import { Poppins } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import StandardLayout from '~/Components/layouts/standard-layout'
import { siteDescription, CANONICAL_SITE_DOMAIN } from '~/constant'

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
		'Software Development Engineer',
		'web development',
		'Frontend Developer',
		'Next.js Developer',
		'TypeScript Developer',
		'Framer Motion',
		'Tailwind CSS',
		'SEO Optimization',
		'Dynamic Web Applications',
		'Responsive Websites',
		'UI/UX Design',
		'Web Performance Optimization',
		'Web Animations'
	],

	publisher: 'nandanipaliwal',
	robots: 'index, follow',
	creator: 'Nandani Paliwal',
	manifest: 'https://nandanipaliwal.co/manifest.json',
	openGraph: {
		type: 'website',
		url: 'https://nandanipaliwal.co',
		title: 'nandanipaliwal',
		description: siteDescription,
		images: [{ url: 'https://nandanipaliwal.co/open-graph.png' }],
		siteName: 'nandanipaliwal'
	},
	twitter: {
		card: 'summary_large_image',
		site: '@nandanipaliwal',
		description: siteDescription,
		title: 'nandanipaliwal',
		creator: '@nandanipaliwal',
		images: 'https://nandanipaliwal.co/twitter-og.png'
	},
	verification: {
		google: '3pcgDO252qqFNpLV8k-VpGfSw-iEqfwicYqlqWDFGa0'
	},
	formatDetection: { telephone: false },
	appleWebApp: true,
	assets: 'https://nandanipaliwal.co/assets',
	category: 'Innovation, Product Development, Business Solutions',
	classification: 'Innovative Development Agency',
	other: {
		'X-UA-Compatible': 'IE=edge,chrome=1',
		'mobile-web-app-capable': 'yes'
	},
	metadataBase: new URL('https://nandanipaliwal.co'),
	alternates: {
		canonical: new URL(CANONICAL_SITE_DOMAIN)
	},
	icons: [
		{ rel: 'icon', url: 'https://nandanipaliwal.co/favicon.ico' },
		{ rel: 'apple-touch-icon', url: 'https://nandanipaliwal.co/apple-icon.png' }
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
