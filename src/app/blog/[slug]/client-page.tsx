'use client'

import Container from '~/components/design-system/container'
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
import Button from '~/components/design-system/button'
import { PlayerTriggerStateEnum } from '~/types'
import colors from 'tailwindcss/colors'
import dynamic from 'next/dynamic'

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
					'group flex items-center rounded-md border-l-4 border-transparent px-3 py-2 text-sm font-medium  hover:bg-gray-50 hover:text-gray-900',
					activeTocNodeId === `heading-${node.slug}`
						? 'bg-gray-50 font-semibold text-primary-500'
						: 'text-gray-600'
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

	const AnimatedIconPlayer = dynamic(() => import('../../../components/lord-icon/index'), {
		ssr: false
	})

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
		<section className="relative z-10 flex py-10">
			<Script
				id="jsonld-article"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(addArticleJsonLd(publication, post))
				}}
			/>
			{/* table of content */}
			<aside
				id="table-of-content"
				className="fixed left-0 hidden max-w-80 flex-col px-6 py-8 xl:flex"
			>
				<div className="group flex items-center rounded-md border-l-4 border-transparent px-3 py-2 text-sm font-medium text-gray-900">
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

			<div className="flex-1 xl:ml-[17rem]">
				<Container className="relative flex flex-1 flex-row gap-6">
					<article className="flex w-full flex-col items-start gap-10 overflow-y-auto border-l-2 border-r-2 border-gray-200/40 px-6 py-10 pb-10">
						<div className="blog-article-page container relative mx-auto grid w-full grid-cols-8">
							<div className="col-span-full mx-auto flex w-full flex-col gap-8">
								{/* Article title */}

								<div className="flex flex-col gap-3 border-b-2 border-gray-200/50">
									<Link
										href={getAbsolutePostUrl(post.slug)}
										className="tooltip-handle text-sm text-slate-500 dark:text-slate-400"
										data-title={`${dayjs(post.publishedAt).format(
											'dddd, MMM D, YYYY'
										)}`}
									>
										<span>{dayjs(post.publishedAt).format('MMM D, YYYY')}</span>
									</Link>

									<div className="flex flex-col items-center justify-center gap-2">
										<div
											className={clsx(
												`font-heading break-words px-4 text-center text-2xl font-extrabold text-slate-900 dark:text-white md:px-5 md:text-4xl lg:px-8 xl:px-10 xl:text-4xl`
											)}
										>
											<h1 className="leading-snug" data-query="post-title">
												{post.title}
											</h1>
										</div>

										{/* Article subtitle */}
										{post.subtitle && (
											<div className="font-heading px-4 text-center md:px-5 lg:px-8 xl:px-10">
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
										className="min-h-30 prose prose-lg xl:prose-xl dark:prose-dark mx-auto mb-10 break-words"
										dangerouslySetInnerHTML={{ __html: memoisedContent }}
									></div>
								</div>
							</div>

							<div className="col-span-full mx-auto flex  w-full flex-col items-center justify-center gap-8">
								<Link href={'/contact'} title="launch-with-us">
									<Button size={'large'}>
										<AnimatedIconPlayer
											iconSrc={'/assets/lord-icons/trending-up.json'}
											trigger={PlayerTriggerStateEnum.Hover}
											size={24}
											color={colors.white}
										/>
										Launch with us
									</Button>
								</Link>
							</div>
						</div>
					</article>

					{/* author details and related posts */}
					<aside className="hidden h-full w-96 overflow-y-auto pt-40 md:block">
						<h3 className="group flex items-start border-l-4 border-transparent px-3 py-2 text-left text-sm font-medium text-gray-600">
							Related Posts
						</h3>
						<div className="flex flex-col gap-2">
							{morePosts?.edges.map((edge: any) => {
								const relatedBlog = edge.node
								return (
									<Link
										key={relatedBlog.id}
										className="rounded-md p-1 pl-4 pr-0 hover:bg-secondary-200/40"
										title={relatedBlog.title}
										href={getPostUrl(relatedBlog.slug)}
									>
										<div className="flex flex-col items-start gap-1">
											<h2 className="text-sm text-secondary-900 ">
												{relatedBlog.title}
											</h2>
											<div className="flex gap-3">
												{relatedBlog.author.profilePicture ? (
													<Image
														src={relatedBlog.author.profilePicture}
														alt={`${relatedBlog.author.name}-profile-picture`}
														height={10}
														className="rounded-full"
														width={20}
													/>
												) : null}
												<h3 className="text-sm text-secondary-700">
													{relatedBlog.author.name}
												</h3>
											</div>
										</div>
									</Link>
								)
							})}
						</div>
					</aside>
				</Container>
			</div>
		</section>
	)
}
