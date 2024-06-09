import { request } from 'graphql-request'
import {
	PageByPublicationDocument,
	type PageByPublicationQuery,
	type PageByPublicationQueryVariables,
	PostsByPublicationDocument,
	type PostsByPublicationQuery,
	type PostsByPublicationQueryVariables,
	SinglePostByPublicationDocument,
	type SinglePostByPublicationQuery,
	type SinglePostByPublicationQueryVariables
} from 'root/generated/graphql'
import { HASHNODE_GQL_ENDPOINT, HASHNODE_PUBLICATION_HOST } from '~/constant'
import { notFound } from 'next/navigation'

export async function getBlogPostData(slug: string) {
	if (!HASHNODE_GQL_ENDPOINT || !HASHNODE_PUBLICATION_HOST) {
		throw new Error(
			'NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT or HASHNODE_PUBLICATION_HOST is not define'
		)
	}
	const [postDetailsData, morePostsData] = await Promise.all([
		request<SinglePostByPublicationQuery, SinglePostByPublicationQueryVariables>(
			HASHNODE_GQL_ENDPOINT,
			SinglePostByPublicationDocument,
			{
				host: HASHNODE_PUBLICATION_HOST,
				slug: slug
			}
		),
		request<PostsByPublicationQuery, PostsByPublicationQueryVariables>(
			HASHNODE_GQL_ENDPOINT,
			PostsByPublicationDocument,
			{
				first: 4,
				host: HASHNODE_PUBLICATION_HOST
			}
		)
	])
	const publication = postDetailsData.publication
	const morePosts = morePostsData.publication?.posts
	if (!publication) {
		notFound()
	}
	const post = publication.post
	if (!post) {
		const staticPageData = await request<
			PageByPublicationQuery,
			PageByPublicationQueryVariables
		>(HASHNODE_GQL_ENDPOINT, PageByPublicationDocument, {
			host: HASHNODE_PUBLICATION_HOST,
			slug: slug
		})

		const page = staticPageData.publication?.staticPage
		if (!page) {
			notFound()
		}
		return {
			post: null,
			page,
			publication,
			morePosts
		}
	}
	return {
		post,
		morePosts,
		page: null,
		publication
	}
}
