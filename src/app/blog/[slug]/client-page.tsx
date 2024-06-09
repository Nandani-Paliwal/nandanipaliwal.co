'use client'

import { Container } from '~/Components/design-system/container'
import { type PostFullFragment, type PublicationFragment } from 'root/generated/graphql'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { addArticleJsonLd, getAbsolutePostUrl, getPostUrl } from '~/reusable-functions'
import { dayjs } from '~/utils/dayjs'
import { blurImageDimensions } from '~/constant'
import { getBlurHash, imageReplacer, resizeImage } from '~/utils/blog/image-utils'
import { useEffect, useMemo, useState } from 'react'
import { useBlogStore } from '~/store/blog-store'
import Script from 'next/script'

type Props = {
	post: PostFullFragment | null
	publication: PublicationFragment
	morePosts: any
}

type TocTreeNodeType = {
	id: string
	title: string
	slug: string
	children?: TocTreeNodeType[]
}

function generateHierarchialTableOfContent(
	data: PostFullFragment['features']['tableOfContents']['items']
) {
	type tocNodeType = PostFullFragment['features']['tableOfContents']['items'][number]

	const nodes: Record<string, tocNodeType & { children: tocNodeType[] }> = {}
	const tree: TocTreeNodeType[] = []

	data.forEach(node => (nodes[node.id] = { ...node, children: [] }))

	data.forEach(node => {
		if (node.level <= 2) {
			if (node.parentId) {
				nodes[node.parentId].children.push(nodes[node.id])
			} else {
				tree.push(nodes[node.id])
			}
		} else {
			// do nothing
		}
	})

	return tree
}

const TocTreeNode = ({
	node,
	addSpacing,
	activeTocNodeId
}: {
	node: TocTreeNodeType
	addSpacing: boolean
	activeTocNodeId: string | null
}) => (
	<div className={clsx(addSpacing ? 'toc-node ml-10' : '')}>
		<Link href={`#${node.slug}`} title={`${node.slug}`} id={`${node.slug}-toc-link`}>
			<div
				className={clsx(
					'dark:hover;text-gray-300 group flex items-center rounded-md border-l-4 border-transparent px-3 py-2 text-sm  font-medium hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-500',
					activeTocNodeId === `heading-${node.slug}`
						? 'bg-gray-50 font-semibold text-primary-500 dark:bg-gray-300'
						: 'text-gray-600 '
				)}
			>
				{node.title}
			</div>
		</Link>
		{node.children && node.children.length > 0 && (
			<div>
				{node.children.map(child => (
					<TocTreeNode
						key={child.id}
						node={child}
						addSpacing={true}
						activeTocNodeId={activeTocNodeId}
					/>
				))}
			</div>
		)}
	</div>
)

export default function BlogPostClientPage({ post, morePosts, publication }: Props) {
	if (!post) {
		throw new Error('No post found!')
	}

	const tableOfContent = post?.features?.tableOfContents?.isEnabled
		? post.features?.tableOfContents?.items.flat()
		: []

	const tocToRender = generateHierarchialTableOfContent(tableOfContent)

	const memoisedContent = useMemo(
		() => imageReplacer(post.content.html, true, post.title),
		[post.content, post.title]
	)

	const [activeTocNodeId, setActiveTocNodeId] = useState<string | null>(null)

	const writeBlogProperty = useBlogStore(state => state.writeProperty)

	useEffect(() => {
		writeBlogProperty({
			publication: publication,
			post: post
		})
	}, [publication, writeBlogProperty, post])

	useEffect(() => {
		if (!document) return

		const headingIds = tocToRender.map(node => `heading-${node.slug}`)

		const handleScroll = () => {
			let foundActive = false
			for (const id of headingIds) {
				const element = document.getElementById(id)

				if (element) {
					if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
						setActiveTocNodeId(id)
						foundActive = true
					}
				} else {
					// nothing
				}
			}

			if (!foundActive) {
				setActiveTocNodeId(null)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [tocToRender])

	return (
		<section className="relative z-10 mx-auto flex max-w-7xl px-4 py-10 ">
			<Script
				id="jsonld-article"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(addArticleJsonLd(publication, post))
				}}
			/>

			<div className="realtive mt-10 flex-1 py-20 xl:mr-[17rem]">
				<Container className="flex flex-1 flex-row gap-6 dark:border-zinc-700 md:py-5">
					<article className="overflow-y-autopx-6 flex w-full flex-col items-start gap-10 pb-10 md:py-10">
						<div className="blog-article-page container relative mx-auto grid w-full grid-cols-8 px-4 py-5 ">
							<div className="absolute left-0 top-10 -z-0 h-px w-full border-t border-dashed border-zinc-400 py-5 dark:border-zinc-700 "></div>
							<div className=" col-span-full mx-auto flex w-full flex-col gap-8 border-x border-dashed border-zinc-400 py-5 dark:border-zinc-700">
								{/* Article title */}

								<div className="flex flex-col gap-3 md:px-5 lg:px-8 xl:px-10">
									<Link
										href={getAbsolutePostUrl(post.slug)}
										className="tooltip-handle text-sm font-medium text-primary-500"
										data-title={`${dayjs(post.publishedAt).format(
											'dddd, MMM D, YYYY'
										)}`}
									>
										<span>{dayjs(post.publishedAt).format('MMM D, YYYY')}</span>
									</Link>

									<div className="flex flex-col gap-2">
										<div
											className={clsx(
												`font-heading break-words text-left text-2xl font-extrabold text-slate-900 dark:text-white md:text-4xl xl:text-4xl`
											)}
										>
											<h1 className="leading-snug" data-query="post-title">
												{post.title}
											</h1>
										</div>

										{/* Article subtitle */}
										{post.subtitle && (
											<div className="font-heading text-left">
												<h2 className="text-xl leading-snug text-slate-700 dark:text-slate-400 md:text-3xl xl:text-2xl">
													{post.subtitle}
												</h2>
											</div>
										)}
									</div>

									{/* Top cover */}
									{post.coverImage?.url &&
										!post.preferences.stickCoverToBottom && (
											<div className="relative">
												<Image
													className="mb-0 block w-full"
													placeholder="blur"
													src={resizeImage(post.coverImage.url, {
														w: 1600,
														h: 840,
														...(!post.coverImage.isPortrait
															? { c: 'thumb' }
															: { fill: 'blur' })
													})}
													blurDataURL={getBlurHash(
														resizeImage(post.coverImage.url, {
															...blurImageDimensions,
															...(!post.coverImage.isPortrait
																? { c: 'thumb' }
																: { fill: 'blur' })
														})
													)}
													width={1600}
													height={840}
													alt={post.title}
													priority
												/>
											</div>
										)}
								</div>

								<div id="post-content-parent" className="relative mb-10 pb-6">
									<div
										id="post-content-wrapper"
										className="min-h-30  prose prose-lg mx-auto mb-10 break-words xl:prose-xl dark:text-gray-400"
										dangerouslySetInnerHTML={{ __html: memoisedContent }}
									></div>
								</div>
							</div>
							<div className="absolute bottom-0 left-0 -z-0 h-px w-full border-t border-dashed border-zinc-400 py-5 dark:border-zinc-700 md:bottom-0 "></div>
						</div>
					</article>
				</Container>
			</div>

			{/* table of content */}
			<aside
				id="table-of-content"
				className="fixed top-52 mt-10 hidden max-w-80 flex-col px-6 py-20 xl:right-0 xl:flex min-[1350px]:right-7  min-[1420px]:right-10 min-[1460px]:right-16 min-[1490px]:right-20 min-[1520px]:right-28  min-[1600px]:right-36 min-[1650px]:right-44 min-[1720px]:right-56 min-[1810px]:right-64 min-[1880px]:right-72 min-[1930px]:right-80 min-[2020px]:right-96 min-[2120px]:right-[450px] min-[2280px]:right-[510px] min-[2400px]:right-[570px] min-[2520px]:right-[600px] "
			>
				<div className="group flex items-center rounded-md border-l-4 border-transparent px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-400">
					Table of Content
				</div>
				{tocToRender.map(node => (
					<TocTreeNode
						key={node.id}
						node={node}
						addSpacing={false}
						activeTocNodeId={activeTocNodeId}
					/>
				))}
			</aside>
		</section>
	)
}
