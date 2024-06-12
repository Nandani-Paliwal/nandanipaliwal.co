// import { Waypoint } from 'react-waypoint'
import Button from '~/Components/design-system/button'
import type {
	PageInfo,
	RequiredPublicationFieldsFragment,
	PostThumbnailFragment
} from 'root/generated/graphql'
import BlogPostPreview from './blog-article-card'
import { ChevronDownSVG } from '../icons/svgs'

const PublicationPosts = (props: {
	posts: {
		edges: Array<{
			cursor: string
			node: PostThumbnailFragment
		}>
		pageInfo: Pick<PageInfo, 'hasNextPage' | 'endCursor'>
	}
	publication: Pick<RequiredPublicationFieldsFragment, 'features'>
	fetchMore: () => void
	fetching: boolean
	fetchedOnce: boolean
}) => {
	const { posts, publication, fetchMore, fetching, fetchedOnce } = props
	const { edges, pageInfo } = posts

	console.log({ edges: edges.length })

	const slicedPosts = edges.map(edge => edge.node)

	return (
		<div className="blog-articles-area relative mx-auto mt-10 px-4 py-20 dark:border-slate-800">
			<div className="absolute left-0 top-24 -z-0 h-px w-full border-t border-dashed border-zinc-400 py-5 dark:border-zinc-700 "></div>
			<div className="blog-articles-subarea h-full border-x border-dashed border-zinc-400 px-4 py-5 dark:border-zinc-700">
				<div className="flex flex-col gap-3 pb-10">
					<h1 className="font-bold text-primary-600">Blogs</h1>
					{/* <div className="flex-col gap-3 md:flex">
						<h2 className="max-w-3xl text-xl font-bold tracking-tighter md:text-5xl">
							News, insights and more
						</h2>
						<p className="max-w-lg text-base font-normal tracking-tight md:text-xl">
							Learn more about Clerk, our approach to authentication, and company
							news.
						</p>
					</div> */}
				</div>
				<div className="blog-articles-container 0 container mx-auto flex  w-full flex-col gap-10 pt-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:pt-10 2xl:pt-5">
					{slicedPosts.map(post => (
						<BlogPostPreview key={post.id} post={post} publication={publication} />
					))}
					{fetching && (
						<>
							<div className="col-span-1 animate-pulse">
								<div
									style={{ paddingTop: '52.5%' }}
									className="mb-4 block w-full rounded-lg bg-slate-200 dark:border-slate-800"
								/>
								<div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 w-1/2 rounded-lg bg-slate-200 dark:border-slate-800" />
							</div>
							<div className="col-span-1 animate-pulse">
								<div
									style={{ paddingTop: '52.5%' }}
									className="mb-4 block w-full rounded-lg bg-slate-200 dark:border-slate-800"
								/>
								<div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 w-1/2 rounded-lg bg-slate-200 dark:border-slate-800" />
							</div>
							<div className="col-span-1 animate-pulse">
								<div
									style={{ paddingTop: '52.5%' }}
									className="mb-4 block w-full rounded-lg bg-slate-200 dark:border-slate-800"
								/>
								<div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:border-slate-800" />
								<div className="mb-2 h-4 w-1/2 rounded-lg bg-slate-200 dark:border-slate-800" />
							</div>
						</>
					)}
					{pageInfo.hasNextPage && !fetching ? (
						<div className="col-span-1 flex flex-row justify-center px-4 pt-10 md:col-span-2 lg:col-span-3">
							<Button
								type="button"
								variant="outline"
								className="w-full justify-center px-4 py-2 text-lg"
								onClick={fetchMore}
							>
								<span>Load more</span>
								<ChevronDownSVG className="ml-3 h-5 w-5 fill-current" />
							</Button>
						</div>
					) : null}
				</div>
				{/* {fetchedOnce && pageInfo.hasNextPage ? (
				<Waypoint onEnter={fetchMore} topOffset="-20%" />
			) : null} */}
				{fetchedOnce && !pageInfo.hasNextPage ? (
					<div className="blog-posts-end-card font-heading mt-10 px-16 pt-8 text-center font-bold text-slate-700 dark:text-slate-300">
						<p className="text-2xl">You&apos;ve reached the end! 👋</p>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default PublicationPosts
