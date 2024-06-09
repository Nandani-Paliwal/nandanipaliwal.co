import { Waypoint } from 'react-waypoint'
import { clsx } from 'clsx'
import Button from '~/components/design-system/button'
import PubLoaderComponent from './pub-loader-component'
import {
	type PageInfo,
	type Preferences,
	type RequiredPublicationFieldsFragment,
	type PostThumbnailFragment,
	PublicationLayout
} from 'root/generated/graphql'
import BlogPostPreview from './blog-post-preview'
import { ChevronDownSVG } from '../icons/svgs'

export type RequiredPublicationProps = Pick<
	RequiredPublicationFieldsFragment,
	'features' | 'isTeam'
> & {
	preferences: Pick<Preferences, 'layout'>
}

const PublicationPosts = (props: {
	posts: {
		edges: Array<{
			cursor: string
			node: PostThumbnailFragment
		}>
		pageInfo: Pick<PageInfo, 'hasNextPage' | 'endCursor'>
	}
	publication: RequiredPublicationProps
	pinnedPostId?: string
	fetchMore: () => void
	fetching: boolean
	fetchedOnce: boolean
}) => {
	const { posts, publication, pinnedPostId, fetchMore, fetching, fetchedOnce } = props
	const { edges, pageInfo } = posts
	const {
		preferences: { layout }
	} = publication

	return (
		<>
			<div
				className={clsx(
					'blog-posts-wrapper mt-10',
					layout === PublicationLayout.Grid ? 'flex flex-row flex-wrap items-start' : ''
				)}
			>
				{edges.map(({ node }) => (
					<BlogPostPreview
						key={node.id}
						post={node}
						publication={publication}
						pinnedPostId={pinnedPostId}
					/>
				))}
				{pageInfo.hasNextPage && !fetchedOnce && !fetching ? (
					<div className="mb-16 flex w-full flex-row items-center justify-center">
						<Button
							type="button"
							variant="outline"
							className="w-full justify-center px-4 py-2 text-lg text-blue-600 dark:text-blue-500"
							onClick={fetchMore}
						>
							<span>Load more</span>
							<ChevronDownSVG className="ml-3 h-5 w-5 fill-current" />
						</Button>
					</div>
				) : null}
				{fetching ? <PubLoaderComponent layout={publication.preferences.layout} /> : null}
			</div>
			{fetchedOnce && pageInfo.hasNextPage ? (
				<Waypoint onEnter={fetchMore} topOffset="-20%" />
			) : null}
			{fetchedOnce && !pageInfo.hasNextPage ? (
				<div className="blog-posts-end-card font-heading my-10 px-16 py-8 text-center font-bold text-slate-700 dark:text-slate-300">
					<p className="text-2xl">You&apos;ve reached the end! 👋</p>
				</div>
			) : null}
		</>
	)
}

export default PublicationPosts
