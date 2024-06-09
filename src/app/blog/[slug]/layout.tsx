import React from 'react'
import { getBlogPostData } from './function'
import { type Metadata } from 'next'
import {
	CANONICAL_SITE_DOMAIN,
	META_CATEGORY,
	META_CLASSIFICATION,
	META_KEYWORDS
} from '~/constant'

export const generateMetadata = async (props: { params: { slug: string } }): Promise<Metadata> => {
	const { params } = props
	const { post, publication } = await getBlogPostData(params.slug)
	return {
		title: post?.title || post?.subtitle || publication.title,
		description: post?.seo?.description || post?.subtitle,
		applicationName: 'nandanipaliwal',
		authors: [{ name: post?.author.name, url: `${CANONICAL_SITE_DOMAIN}/about` }],
		generator: 'Next.js',
		referrer: 'origin-when-cross-origin',
		keywords: [...META_KEYWORDS, ...(post?.tags || []).map(tag => tag.name)],
		publisher: 'Nandani Paliwal',
		robots: 'index, follow',
		creator: 'Nandani Paliwal',
		manifest: `${CANONICAL_SITE_DOMAIN}/manifest.json`,
		openGraph: {
			type: 'article',
			url: `${CANONICAL_SITE_DOMAIN}/blog/${post?.slug}`,
			title: post?.title,
			description: post?.seo?.description || post?.subtitle || publication.title,
			images: [
				{
					url: post?.ogMetaData?.image || `${CANONICAL_SITE_DOMAIN}/open-graph.png`
				}
			],
			siteName: 'nandanipaliwal'
		},
		alternates: {
			canonical: new URL(`${CANONICAL_SITE_DOMAIN}/blog/${post?.slug}`)
		},
		twitter: {
			card: 'summary_large_image',
			site: '@nandanipaliwal',
			description: post?.seo?.description || post?.subtitle || undefined,
			title: post?.title || post?.subtitle || publication.title,
			creator: '@nandanipaliwal',
			images: post?.ogMetaData?.image || `${CANONICAL_SITE_DOMAIN}/twitter-og.png`
		},
		category: META_CATEGORY.join(', '),
		classification: [...META_CLASSIFICATION, ...(post?.tags || []).map(tag => tag.name)].join(
			', '
		),
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

const BlogPostLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <>{children}</>
}

export default BlogPostLayout
