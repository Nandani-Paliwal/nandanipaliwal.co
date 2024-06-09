'use client'

import {
	type PublicationFragment,
	SeriesPageInitialDocument,
	type SeriesPageInitialQuery,
	PublicationLayout
} from 'root/generated/graphql'
import { clsx } from 'clsx'
import ModernLayoutPosts from '~/Components/blog/modern-layout-posts'
import { useQuery } from 'urql'
import { useEffect, useState } from 'react'
import { HASHNODE_PUBLICATION_HOST } from '~/constant'
import { resizeImage } from '~/utils/blog/image-utils'
import Image from 'next/image'
import { withUrqlClient } from 'next-urql'
import { getUrqlClientConfig } from '~/hashnode-api/client'
import BlogListLayout from '~/Components/blog/blog-list-layout'
import { useBlogStore } from '~/store/blog-store'

const SeriesClientPage = ({
	series,
	publication,
	posts,
	slug,
	initialLimit,
	seriesList
}: {
	publication: PublicationFragment
	posts: NonNullable<NonNullable<SeriesPageInitialQuery['publication']>['series']>['posts']
	series: NonNullable<NonNullable<SeriesPageInitialQuery['publication']>['series']>
	seriesList: NonNullable<
		NonNullable<SeriesPageInitialQuery['publication']>['seriesList']
	>['edges'][number]['node'][]
	slug: string
	initialLimit: number
}) => {
	if (!HASHNODE_PUBLICATION_HOST) {
		throw new Error('HASHNODE_PUBLICATION_HOST not found')
	}

	const [after, setAfter] = useState<string | null>(null)
	const [{ data, fetching }] = useQuery({
		query: SeriesPageInitialDocument,
		variables: {
			host: HASHNODE_PUBLICATION_HOST,
			slug: slug,
			first: initialLimit,
			after
		},
		requestPolicy: 'cache-first'
	})
	const postData = data?.publication?.series?.posts || posts

	const fetchedOnce = postData.edges.length > initialLimit

	const fetchMore = () => {
		if (postData.pageInfo.hasNextPage) {
			setAfter(postData.edges[postData.edges.length - 1].cursor)
		}
	}

	const writeBlogProperty = useBlogStore(state => state.writeProperty)

	useEffect(() => {
		writeBlogProperty({
			publication: publication
		})
	}, [publication, writeBlogProperty])

	return (
		<BlogListLayout series={seriesList}>
			<div
				className={clsx(
					'blog-content-area feed-width mx-auto md:max-w-4xl',
					!!publication.about?.html && 'mt-12'
				)}
			>
				<div>
					<div
						className={clsx(
							'blog-series-card mb-16 mt-12',
							publication.preferences.layout === PublicationLayout.Grid
								? 'px-4 lg:px-8'
								: 'px-4 lg:px-16'
						)}
					>
						<div className="flex flex-col-reverse flex-wrap items-center xl:flex-row xl:items-start">
							<div
								className={clsx(
									'pr-8',
									series.coverImage ? 'w-full md:w-1/2' : 'w-full'
								)}
							>
								<span className="blog-series-label mb-2 font-semibold uppercase tracking-tight text-slate-600 dark:text-slate-400">
									Series
								</span>
								<h1 className="blog-series-title font-heading mb-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl xl:text-5xl">
									{series.name}
								</h1>
								{series.description?.html && (
									<div
										className="blog-series-desc dark:prose-dark prose prose-lg mb-5"
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{
											__html: series.description.html
										}}
									/>
								)}
							</div>
							{series.coverImage && (
								<div className="blog-series-cover-container mb-5 w-full md:mb-0 md:w-1/2">
									{/* custom-style */}
									<div
										className="blog-series-cover h-32 w-full rounded-lg border bg-cover bg-center bg-no-repeat dark:border-slate-800"
										style={{
											backgroundImage: `url('${resizeImage(
												series.coverImage,
												{
													w: 800,
													c: 'thumb'
												}
											)}')`,
											width: '100%',
											paddingTop: '52.5%'
										}}
									/>
								</div>
							)}
						</div>
					</div>

					{posts.edges.length === 0 && publication.isTeam ? (
						<div className="mb-6 flex w-full flex-col items-center rounded border-2 border-dashed p-6 dark:border-slate-800">
							<Image
								className="mb-5 block w-56"
								alt="No posts"
								src="https://cdn.hashnode.com/res/hashnode/image/upload/v1584017401345/LrrwlBZC0.png"
								height={100}
								width={100}
							/>
							<p className="text-2xl font-bold leading-snug tracking-tight text-slate-700 dark:text-slate-400">
								No posts yet
							</p>
						</div>
					) : null}

					{posts.edges.length > 0 && (
						<div className="my-10 flex flex-col items-center justify-center">
							<hr className="w-full border-t dark:border-slate-800" />
							<p className="-mt-5 bg-white p-2 font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400">
								Articles in this series
							</p>
						</div>
					)}

					<ModernLayoutPosts
						publication={publication}
						posts={postData}
						fetchMore={fetchMore}
						fetchedOnce={fetchedOnce}
						fetching={fetching}
					/>
				</div>
			</div>
		</BlogListLayout>
	)
}

export default withUrqlClient(getUrqlClientConfig, { neverSuspend: true })(SeriesClientPage)
