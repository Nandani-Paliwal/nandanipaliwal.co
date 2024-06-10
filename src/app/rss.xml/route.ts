import { NextResponse } from 'next/server'
import { request as gqlRequest } from 'graphql-request'
import {
	SitemapDocument,
	type SitemapQuery,
	type SitemapQueryVariables
} from 'root/generated/graphql'
import {
	CANONICAL_SITE_DOMAIN,
	NON_ASCII_REGEX,
	MetaTitle,
	META_CATEGORY,
	ProductDescription
} from '~/constant'
import RSS from 'rss'
import { notFound } from 'next/navigation'

const constructRssFeedFromPosts = (
	posts: any[],
	currentCursor: string | null,
	nextCursor: string | null
) => {
	const baseUrl = CANONICAL_SITE_DOMAIN

	const customElements = [
		{
			'atom:link': {
				_attr: {
					rel: 'first',
					href: `${baseUrl}/rss.xml`
				}
			}
		}
	]
	if (nextCursor) {
		customElements.push({
			'atom:link': {
				_attr: {
					rel: 'next',
					href: `${baseUrl}/rss.xml${nextCursor ? `?after=${nextCursor}` : ''}`
				}
			}
		})
	}

	const feedConfig = {
		title: `Blog | ${MetaTitle}}`,
		description: ProductDescription,
		feed_url: `${baseUrl}/rss.xml${currentCursor ? `?after=${currentCursor}` : ''}`,
		site_url: baseUrl,
		image_url: `${CANONICAL_SITE_DOMAIN}/assets/logo/main-logo-orange.svg`,
		language: 'en',
		ttl: 60,
		custom_elements: customElements
	}

	const feed = new RSS(feedConfig)

	posts.forEach(post => {
		console.log({ post })

		feed.item({
			title: post.title,
			description: post.content.html.replace(NON_ASCII_REGEX, ''),
			url: `${baseUrl}/blog/${post.slug}`,
			// @ts-ignore
			category: [...META_CATEGORY, ...(post.tags?.map(tag => tag.name) || [])].join(', '),
			author: post.author.name,
			date: post.publishedAt,
			...(post.coverImage && { custom_elements: [{ cover_image: post.coverImage.url }] })
		})
	})

	const xml = feed.xml({ indent: true })
	return xml
}

export async function GET(request: Request) {
	try {
		const HOST = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST
		const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT

		if (!GQL_ENDPOINT || !HOST) {
			console.error({
				HOST,
				GQL_ENDPOINT
			})
			throw new Error('process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT undefined!!!')
		}

		const parsedUrl = new URL(request.url)

		const after = parsedUrl.searchParams.get('after') || null

		const data = await gqlRequest<SitemapQuery, SitemapQueryVariables>(
			GQL_ENDPOINT,
			SitemapDocument,
			{
				host: HOST,
				postsCount: 1000,
				staticPagesCount: 50
			}
		)

		const publication = data.publication

		if (!publication) {
			notFound()
		}

		const allPosts = publication.posts.edges.map(edge => edge.node)

		const xml = constructRssFeedFromPosts(
			allPosts,
			after,
			publication.posts.pageInfo.hasNextPage && publication.posts.pageInfo.endCursor
				? publication.posts.pageInfo.endCursor
				: null
		)

		return new Response(xml, {
			status: 200,
			headers: {
				'Content-Type': 'text/xml; charset=utf-8'
			}
		})
	} catch (error) {
		console.error({ error })
		return NextResponse.json({ status: 'error' }, { status: 500 })
	}
}
