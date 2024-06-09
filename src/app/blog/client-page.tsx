'use client'

import React, { useEffect, useState } from 'react'
import { createSSRExchange, getUrqlClientConfig } from '~/hashnode-api/client'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { useQuery } from 'urql'
import {
	HomePagePostsDocument,
	PublicationLayout,
	type HomePageInitialQuery
} from 'root/generated/graphql'
import ModernLayoutPosts from '~/Components/blog/modern-layout-posts'
import Image from 'next/image'
import { resizeImage } from '~/utils/blog/image-utils'
import { type SSRData } from '@urql/core'
import { clsx } from 'clsx'
import CustomScrollArea from '~/Components/scroll-area'
import BlogListLayout from '~/Components/blog/blog-list-layout'
import { useBlogStore } from '~/store/blog-store'
import Script from 'next/script'
import { addPublicationJsonLd } from '~/reusable-functions'

const NoPostsImage = ({ alt = '' }) => {
	return (
		<Image
			alt={alt}
			height={500}
			width={500}
			src={resizeImage(
				'https://cdn.hashnode.com/res/hashnode/image/upload/v1625676910594/d1jtXmfQC.png?auto=compress',
				{ h: 800, w: 800, c: 'thumb' }
			)}
		/>
	)
}

const BlogClientPage: React.FC<{
	publication: HomePageInitialQuery['publication']
	initialLimit: number
	urqlState: SSRData
	host: string
	isHome: boolean
	series: { id: string; name: string; slug: string }[]
}> = ({ host, initialLimit, publication, series }) => {
	const ssrCache = createSSRExchange()
	const urlConfig = getUrqlClientConfig(ssrCache)
	const urqlClient = initUrqlClient({ ...urlConfig }, false) // TODO: Check why is urqlClient not automatically being passed in props. Ideally, since we are using WithUrqlClient HOC, it should automatically come

	const [fetching, setFetching] = useState(false)

	if (!publication) {
		throw new Error('No publication found!')
	}

	const { preferences, pinnedPost } = publication

	const dynamicLimit = preferences.layout === PublicationLayout.Magazine ? 12 : 6

	const [{ data }] = useQuery({
		query: HomePagePostsDocument,
		variables: {
			host,
			first: initialLimit,
			filter: { excludePinnedPost: !!pinnedPost }
		}
	})

	if (!data || !data.publication) {
		throw new Error('No publication found!')
	}

	const { posts } = data.publication

	const fetchedOnce = posts.edges.length > initialLimit

	const postsToBeRendered = {
		edges: pinnedPost
			? [
					{
						node: pinnedPost,
						cursor: `${pinnedPost.id}_${pinnedPost.publishedAt}`
					}
				].concat(posts.edges)
			: posts.edges,
		pageInfo: posts.pageInfo
	}

	const fetchMore = async () => {
		setFetching(true)
		await urqlClient
			.query(HomePagePostsDocument, {
				host,
				first: dynamicLimit,
				after: posts.pageInfo.endCursor,
				filter: { excludePinnedPost: !!pinnedPost }
			})
			.toPromise()
			.finally(() => {
				setFetching(false)
			})
	}

	const writeBlogProperty = useBlogStore(state => state.writeProperty)

	useEffect(() => {
		writeBlogProperty({
			publication: publication
		})
	}, [publication, writeBlogProperty])

	return (
		<BlogListLayout series={series}>
			{publication ? (
				<Script
					id="jsonld-publication"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(addPublicationJsonLd(publication))
					}}
				/>
			) : null}
			<div
				className={clsx(
					'w-full flex-1 lg:mx-auto  lg:max-w-7xl',
					series.length > 0 ? '' : ''
				)}
			>
				<h1 className="sr-only">
					{' '}
					Softlancer - We're on a mission to turn ideas into cutting-edge products,
					fueling business growth. Transforming concepts into impactful products. Let's
					innovate together!{' '}
				</h1>
				<CustomScrollArea>
					<div className="blog-content-area feed-width mx-auto">
						<div>
							{postsToBeRendered.edges.length === 0 ? (
								<>
									<div className="min-h-30 my-10 flex w-full flex-col items-center px-6 dark:border-slate-800">
										<div className="block">
											<NoPostsImage alt="No Posts" />
										</div>
									</div>
								</>
							) : null}
						</div>
					</div>

					{postsToBeRendered.edges.length > 3 ? (
						<ModernLayoutPosts
							publication={publication}
							posts={postsToBeRendered}
							fetchMore={fetchMore}
							fetchedOnce={fetchedOnce}
							fetching={fetching}
						/>
					) : null}
				</CustomScrollArea>
			</div>
		</BlogListLayout>
	)
}

export default withUrqlClient(getUrqlClientConfig, { neverSuspend: true })(BlogClientPage)
