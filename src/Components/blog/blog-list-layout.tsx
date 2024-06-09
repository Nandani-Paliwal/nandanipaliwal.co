'use client'
import React from 'react'

const BlogListLayout: React.FC<
	React.PropsWithChildren<{
		series: { id: string; name: string; slug: string }[]
	}>
> = ({ children }) => {
	return <section className="relative mx-auto flex h-full max-w-7xl">{children}</section>
}

export default BlogListLayout
