import Link from 'next/link'
import type {
	PostThumbnailFragment,
	RequiredPublicationFieldsFragment
} from 'root/generated/graphql'
import { getDefaultPostCoverImageUrl, getPostUrl } from '~/reusable-functions'
import { getBlurHash, kFormatter, resizeImage } from '~/utils/blog/image-utils'
import { BookOpenSVG, ChartMixedSVG } from '../icons/svgs'
import Image from 'next/image'
import { blurImageDimensions } from '~/constant'
import { dayjs } from '~/utils/dayjs'

function BlogPostPreview(props: {
	post: PostThumbnailFragment
	publication: Pick<RequiredPublicationFieldsFragment, 'features'>
}) {
	const { post, publication } = props
	const postUrl = getPostUrl(post.slug)
	const postCoverImageUrl = post.coverImage?.url ?? getDefaultPostCoverImageUrl()

	const preload = async () => {
		const nextData = document.getElementById('__NEXT_DATA__')
		if (nextData) {
			const { buildId } = JSON.parse(nextData.innerHTML)
			if (buildId) {
				fetch(`/_next/data/${buildId}/${post.slug}.json?slug=${post.slug}`)
			}
		}
	}

	return (
		<div className="blog-article-card flex flex-col gap-3 ">
			<Link
				title={post.title}
				href={postUrl}
				onMouseOver={preload}
				onFocus={() => undefined}
				aria-label={`Cover photo of the article titled ${post.title}`}
				className="mb-4 block w-full  overflow-hidden rounded-lg border bg-slate-100 hover:opacity-90  dark:border-slate-800 dark:bg-slate-800"
			>
				<Image
					className="blog-article-card-cover block w-full"
					src={resizeImage(postCoverImageUrl, {
						w: 640,
						h: 336,
						...(!post.coverImage?.isPortrait ? { c: 'thumb' } : { fill: 'blur' })
					})}
					width={640}
					height={336}
					placeholder="blur"
					blurDataURL={getBlurHash(
						resizeImage(postCoverImageUrl, {
							...blurImageDimensions,
							...(!post.coverImage?.isPortrait ? { c: 'thumb' } : { fill: 'blur' })
						})
					)}
					alt={post.title}
				/>
			</Link>
			<div className="blog-article-card-author-strip flex flex-row flex-wrap items-center">
				<div className="flex flex-row items-start leading-snug">
					<div className="block text-sm font-normal text-slate-500 dark:text-slate-400">
						<span>{dayjs(post.publishedAt).format('MMM D, YYYY')}</span> <span>|</span>
					</div>
					&nbsp;
					<div className="blog-article-card-article-meta flex flex-row text-sm">
						{publication.features.readTime.isEnabled && post.readTimeInMinutes ? (
							<>
								<p className="text-slate-500 dark:text-slate-400">
									<Link
										href={postUrl}
										className="flex flex-row items-center"
										onMouseOver={preload}
										onFocus={() => undefined}
									>
										<BookOpenSVG className="mr-2 h-4 w-4 fill-current" />
										<span>{post.readTimeInMinutes} min read</span>
									</Link>
								</p>
							</>
						) : null}
						{post.readTimeInMinutes &&
						Number(post.views) > 0 &&
						publication.features.viewCount.isEnabled ? (
							<p className="mx-2 font-bold text-slate-500 dark:text-slate-400">
								&middot;
							</p>
						) : null}
						{Number(post.views) > 0 && publication.features.viewCount.isEnabled ? (
							<p className="text-slate-500 dark:text-slate-400">
								<Link
									href={postUrl}
									className="flex flex-row items-center"
									onMouseOver={preload}
									onFocus={() => undefined}
								>
									<ChartMixedSVG className="mr-2 h-4 w-4 fill-current" />
									<span>{kFormatter(post.views)} views</span>
								</Link>
							</p>
						) : null}
					</div>
				</div>
			</div>
			<div className="flex w-full flex-1 flex-col">
				<h2 className="blog-article-card-title font-heading mb-2 block break-words text-lg font-bold leading-snug text-slate-900 hover:opacity-75 dark:text-slate-100 md:text-xl">
					<Link
						title={post.title}
						href={postUrl}
						onMouseOver={preload}
						onFocus={() => undefined}
					>
						{post.title}
					</Link>
				</h2>
			</div>
		</div>
	)
}

export default BlogPostPreview
