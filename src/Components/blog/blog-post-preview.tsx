import Image from 'next/legacy/image'
import Link from 'next/link'
import { clsx } from 'clsx'
import { PublicationLayout, type PostThumbnailFragment } from 'root/generated/graphql'
import { type RequiredPublicationProps } from './publication-posts'
import { getDefaultPostCoverImageUrl } from '~/reusable-functions'
import { BookOpenSVG, FileLineChartSVG, PinSVG } from '../icons/svgs'
import { getBlurHash, kFormatter, resizeImage } from '~/utils/blog/image-utils'
import { DEFAULT_AVATAR, blurImageDimensions } from '~/constant'
import { dayjs } from '~/utils/dayjs'

function BlogPostPreview(props: {
	post: PostThumbnailFragment
	publication: RequiredPublicationProps
	pinnedPostId?: string
}) {
	const { post, publication, pinnedPostId } = props
	const postURL = `/${post.slug}`
	const {
		preferences: { layout },
		features
	} = publication

	const postCoverImageURL = post.coverImage?.url ?? getDefaultPostCoverImageUrl()

	const preload = async () => {
		const nextData = document.getElementById('__NEXT_DATA__')
		if (nextData) {
			const { buildId } = JSON.parse(nextData.innerHTML)
			if (buildId) {
				fetch(`/_next/data/${buildId}/${post.slug}.json?slug=${post.slug}`)
			}
		}
	}

	let postBrief = post.subtitle || ''
	if (postBrief.length < 151 && post.brief) {
		postBrief = `${postBrief}${postBrief ? ' · ' : ''}${post.brief.substring(
			0,
			151 - postBrief.length
		)}`
		if (postBrief.length >= 151) {
			const indexLastSpace = postBrief.lastIndexOf(' ')
			postBrief = `${
				indexLastSpace === -1 ? postBrief : postBrief.substring(0, indexLastSpace)
			}...`
		}
	}

	return (
		<div
			className={clsx(
				'blog-post-card mb-16',
				layout === PublicationLayout.Grid ? 'px-4 lg:w-1/2 lg:px-8' : 'px-4 lg:px-16'
			)}
			key={post.id}
		>
			{layout !== PublicationLayout.Grid && post.id === pinnedPostId && (
				<div className="blog-article-card-label font-heading mb-1 flex flex-row items-center break-words font-medium leading-snug text-blue-600 dark:text-blue-500">
					<span>Pinned</span>
					<PinSVG className="ml-1 h-6 w-6 stroke-current" />
				</div>
			)}
			<section
				className={clsx(
					'blog-post-card-wrapper flex flex-wrap items-start',
					layout === PublicationLayout.Grid ? 'flex-col-reverse' : 'flex-row'
				)}
			>
				<div className={layout === PublicationLayout.Grid ? 'w-full' : 'lg:w-3/5'}>
					<h1 className="blog-post-card-title font-heading mb-3 break-words text-2xl font-bold leading-tight text-slate-900 dark:text-white lg:text-3xl">
						<Link
							href={postURL}
							aria-label={post.title}
							title={post.title}
							onMouseOver={preload}
							onFocus={() => undefined}
						>
							{post.title}
						</Link>
					</h1>
					<div
						className={clsx(
							'blog-post-card-meta font-heading mb-3 flex flex-row flex-wrap items-center text-sm font-medium text-slate-500 dark:text-slate-400',
							publication.isTeam && 'mt-4'
						)}
					>
						{publication.isTeam && (
							<div className="mb-4 flex w-full flex-row items-center">
								<Link
									href={`https://www.linkedin.com/in/nandanipaliwal/`}
									className="blog-post-card-author-pic mr-2 block h-8 w-8 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
								>
									<Image
										alt={post.author.name}
										className="block w-full"
										width={72}
										height={72}
										src={resizeImage(
											post.author.profilePicture || DEFAULT_AVATAR,
											{ w: 72, h: 72, c: 'face' }
										)}
									/>
								</Link>
								<Link
									title={post.author.name}
									href={`https://www.linkedin.com/in/nandanipaliwal/`}
									className="blog-post-card-author-name text-lg font-medium text-slate-800 dark:text-slate-200"
								>
									{post.author.name}
								</Link>
							</div>
						)}
						{layout === PublicationLayout.Grid && post.id === pinnedPostId && (
							<div className="blog-article-card-label mr-2 flex flex-row items-center break-words font-medium leading-snug text-blue-600 dark:text-blue-500">
								<span>Pinned</span>
								<PinSVG className="ml-1 h-6 w-6 stroke-current" />
							</div>
						)}
						<Link
							href={postURL}
							aria-label={post.title}
							title={post.title}
							className="blog-post-card-time mr-4"
						>
							{dayjs(post.publishedAt).format('ll')}
						</Link>
						{features.readTime.isEnabled && post.readTimeInMinutes ? (
							<Link
								title={post.title}
								href={postURL}
								aria-label={`${post.title} min read`}
								className="mr-4 flex flex-row items-center"
							>
								<BookOpenSVG className="mr-1 h-4 w-4 fill-current" />
								<span>{post.readTimeInMinutes} min read </span>
							</Link>
						) : null}
						{post.views && features.viewCount.isEnabled ? (
							<Link
								title={post.title}
								href={postURL}
								aria-label={`${post.views} views`}
								className="mr-2 flex flex-row items-center"
							>
								<FileLineChartSVG className="mr-1 h-4 w-4 fill-current" />
								<span>{kFormatter(post.views)} views</span>
							</Link>
						) : null}
					</div>
					<p className="blog-post-card-brief hn-break-words block w-full break-words text-lg leading-snug text-slate-700 dark:text-slate-400">
						<Link
							title={post.title}
							href={postURL}
							aria-label={post.title}
							onMouseOver={preload}
							onFocus={() => undefined}
						>
							{postBrief}
						</Link>
					</p>
				</div>
				<div
					className={clsx(
						'blog-post-card-cover',
						layout === PublicationLayout.Grid
							? 'mb-6 w-full'
							: 'mt-6 w-full lg:mt-0 lg:w-2/5 lg:pl-8'
					)}
				>
					<Link
						title={post.title}
						href={postURL}
						className="block overflow-hidden rounded-lg border dark:border-slate-800"
						aria-label={post.title}
						onMouseOver={preload}
						onFocus={() => undefined}
					>
						<Image
							src={resizeImage(postCoverImageURL, {
								w: 1600,
								h: 840,
								...(!post.coverImage?.isPortrait
									? { c: 'thumb' }
									: { fill: 'blur' })
							})}
							width={1600}
							height={840}
							placeholder="blur"
							blurDataURL={getBlurHash(
								resizeImage(postCoverImageURL, {
									...blurImageDimensions,
									...(!post.coverImage?.isPortrait
										? { c: 'thumb' }
										: { fill: 'blur' })
								})
							)}
							alt={post.title}
							className="post-cover"
						/>
					</Link>
				</div>
			</section>
		</div>
	)
}

export default BlogPostPreview
