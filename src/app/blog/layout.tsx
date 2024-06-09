import { type Metadata } from 'next'
import { getBlogHomePageData } from './function'
import {
	CANONICAL_SITE_DOMAIN,
	META_CATEGORY,
	META_CLASSIFICATION,
	META_KEYWORDS,
	MetaTitle,
	ProductDescription
} from '~/constant'

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await getBlogHomePageData()

	if (!data) {
		throw new Error('getBlogHomePageData returned nothing')
	}

	const { publication } = data

	return {
		title: MetaTitle,
		description: ProductDescription,
		applicationName: 'nandanipaliwal',
		authors: [{ name: publication.author.name, url: `${CANONICAL_SITE_DOMAIN}/about` }],
		generator: 'Next.js',
		referrer: 'origin-when-cross-origin',
		keywords: [...META_KEYWORDS],
		publisher: 'Nandani Paliwal',
		robots: 'index, follow',
		creator: 'Nandani Paliwal',
		manifest: `${CANONICAL_SITE_DOMAIN}/manifest.json`,
		alternates: {
			canonical: new URL(`${CANONICAL_SITE_DOMAIN}/blog`)
		},
		openGraph: {
			type: 'article',
			url: `${CANONICAL_SITE_DOMAIN}/blog`,
			title: MetaTitle,
			description: ProductDescription,
			images: [
				{
					url: publication.ogMetaData.image || `${CANONICAL_SITE_DOMAIN}/open-graph.png`
				}
			],
			siteName: 'nandanipaliwal'
		},
		twitter: {
			card: 'summary_large_image',
			site: '@nandanipaliwal',
			description: ProductDescription,
			title: MetaTitle,
			creator: '@nandanipaliwal',
			images: publication.ogMetaData.image || `${CANONICAL_SITE_DOMAIN}/open-graph.png`
		},
		category: META_CATEGORY.join(', '),
		classification: META_CLASSIFICATION.join(', '),
		other: {
			'X-UA-Compatible': 'IE=edge,chrome=1',
			'mobile-web-app-capable': 'yes'
		},
		metadataBase: new URL(CANONICAL_SITE_DOMAIN),
		icons: [
			{ rel: 'icon', url: `${CANONICAL_SITE_DOMAIN}/favicon.ico` },
			{
				rel: 'apple-touch-icon',
				url: `${CANONICAL_SITE_DOMAIN}/apple-icon.png`
			}
		]
	}
}

const BlogLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
	return <>{children}</>
}

export default BlogLayout
