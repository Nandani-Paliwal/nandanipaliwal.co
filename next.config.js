const ANALYTICS_BASE_URL = 'https://hn-ping2.hashnode.com'
const ADVANCED_ANALYTICS_BASE_URL = 'https://stats.hashnode.com'

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT: process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
		NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		NEXT_PUBLIC_MODE: process.env.NEXT_PUBLIC_MODE
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com'
			},
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com'
			}
		]
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production'
	},
	rewrites() {
		return [
			{
				source: '/ping/data-event',
				destination: `${ANALYTICS_BASE_URL}/api/data-event`
			},
			{
				source: '/ping/view',
				destination: `${ANALYTICS_BASE_URL}/api/view`
			},
			{
				source: '/api/collect',
				destination: `${ADVANCED_ANALYTICS_BASE_URL}/api/collect`
			}
		]
	}
}

module.exports = nextConfig
