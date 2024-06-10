import { request } from 'graphql-request'
import {
	SitemapDocument,
	type SitemapQuery,
	type SitemapQueryVariables
} from 'root/generated/graphql'
import BlogPostClientPage from './client-page'
import { getBlogPostData } from './function'
import { HASHNODE_GQL_ENDPOINT, HASHNODE_PUBLICATION_HOST } from '~/constant'

export const revalidate = 60 * 60 * 24 * 30

export async function generateStaticParams() {
	if (!HASHNODE_GQL_ENDPOINT || !HASHNODE_PUBLICATION_HOST) {
		throw new Error(
			'process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT or process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST is not defined'
		)
	}

	// using this query here because of the post count limitation
	const data = await request<SitemapQuery, SitemapQueryVariables>(
		HASHNODE_GQL_ENDPOINT,
		SitemapDocument,
		{
			host: HASHNODE_PUBLICATION_HOST,
			postsCount: 1000,
			staticPagesCount: 50
		}
	)

	const postSlugs = (data.publication?.posts.edges ?? []).map(edge => edge.node.slug)

	return postSlugs.map(slug => ({
		slug: slug
	}))
}

const BlogPost = async ({ params }: { params: { slug: string } }) => {
	const { morePosts, post, publication } = await getBlogPostData(params.slug)

	return <BlogPostClientPage morePosts={morePosts} post={post} publication={publication} />
}

export default BlogPost
