import React from 'react'
import dynamic from 'next/dynamic'
import SmoothScroll from './smooth-scroll'
import Projects from './projects'

const Earth = dynamic(() => import('./earth'), {
	ssr: false,
	loading: () => <img src="/assets/placeholder.png" className="h-full"></img>
})

export default function Home() {
	return (
		<SmoothScroll>
			<main className="relative flex h-[60vw] items-center justify-center bg-[#0f0f0f]">
				<Earth />
				<Projects />
			</main>
		</SmoothScroll>
	)
}
