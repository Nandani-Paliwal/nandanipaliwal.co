import { type MetadataRoute } from 'next'
import { request } from 'graphql-request'
import {
	MoreSitemapPostsDocument,
	type MoreSitemapPostsQuery,
	type MoreSitemapPostsQueryVariables,
	SitemapDocument,
	type SitemapQuery,
	type SitemapQueryVariables
} from 'root/generated/graphql'
import { CANONICAL_SITE_DOMAIN, HASHNODE_GQL_ENDPOINT, HASHNODE_PUBLICATION_HOST } from '~/constant'
import { notFound } from 'next/navigation'
import { getSeries } from './blog/function'

const MAX_POSTS = 1000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	if (!HASHNODE_GQL_ENDPOINT || !HASHNODE_PUBLICATION_HOST)
		throw new Error('HASHNODE_GQL_ENDPOINT or HASHNODE_PUBLICATION_HOST not defined')

	const [initialData, series] = await Promise.all([
		request<SitemapQuery, SitemapQueryVariables>(HASHNODE_GQL_ENDPOINT, SitemapDocument, {
			host: HASHNODE_PUBLICATION_HOST,
			postsCount: MAX_POSTS,
			staticPagesCount: 50
		}),
		getSeries()
	])

	const publication = initialData.publication
	if (!publication) {
		notFound()
	}
	const posts = publication.posts.edges.map(edge => edge.node)

	// Get more posts by pagination if exists
	const initialPageInfo = publication.posts.pageInfo
	const fetchPosts = async (after: string | null | undefined) => {
		if (!HASHNODE_GQL_ENDPOINT || !HASHNODE_PUBLICATION_HOST)
			throw new Error('HASHNODE_GQL_ENDPOINT or HASHNODE_PUBLICATION_HOST not defined')

		const variables = {
			host: HASHNODE_PUBLICATION_HOST,
			postsCount: MAX_POSTS,
			postsAfter: after
		}

		const data = await request<MoreSitemapPostsQuery, MoreSitemapPostsQueryVariables>(
			HASHNODE_GQL_ENDPOINT,
			MoreSitemapPostsDocument,
			variables
		)
		const publication = data.publication
		if (!publication) {
			return
		}
		const pageInfo = publication.posts.pageInfo

		posts.push(...publication.posts.edges.map(edge => edge.node))

		if (pageInfo.hasNextPage && posts.length < MAX_POSTS) {
			await fetchPosts(pageInfo.endCursor)
		}
	}

	if (initialPageInfo.hasNextPage) {
		await fetchPosts(initialPageInfo.endCursor)
	}

	// ! TODO: add blog series too here
	return [
		{
			url: `${CANONICAL_SITE_DOMAIN}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: `${CANONICAL_SITE_DOMAIN}/about`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: `${CANONICAL_SITE_DOMAIN}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: `${CANONICAL_SITE_DOMAIN}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5
		},
		{
			url: `${CANONICAL_SITE_DOMAIN}/blog`,
			changeFrequency: 'always',
			priority: 0.8,
			lastModified: posts[0].updatedAt || posts[0].publishedAt
		},
		...series.map((item): MetadataRoute.Sitemap[number] => ({
			url: `${CANONICAL_SITE_DOMAIN}/blog/series/${item.slug}`,
			changeFrequency: 'daily',
			priority: 0.8,
			lastModified: posts[0].updatedAt || posts[0].publishedAt
		})),
		...posts.map((post): MetadataRoute.Sitemap[number] => ({
			url: `${CANONICAL_SITE_DOMAIN}/blog/${post.slug}`,
			changeFrequency: 'daily',
			priority: 0.8,
			lastModified: post.updatedAt || new Date()
		}))
	]
}
