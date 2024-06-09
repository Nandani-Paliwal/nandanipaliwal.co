'use client'
import useMousePosition from '~/Components/ui/use-mouse-position'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Socials from '../Components/socials'

export default function Home() {
	const [isHovered, setIsHovered] = useState(false)
	const { x, y } = useMousePosition()
	const size = isHovered ? 400 : 40

	return (
		<main className="">
			<div className="relative  flex h-full flex-col items-center justify-center py-32 md:mx-11 lg:mx-auto">
				<motion.div
					animate={{
						WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
						WebkitMaskSize: `${size}px`
					}}
					transition={{ type: 'tween', ease: 'backOut' }}
					className="mask absolute flex h-full min-h-screen w-full flex-col items-center justify-center py-40 text-black md:px-14 lg:px-24"
				>
					{/* hero section */}
					<div
						onMouseEnter={() => {
							setIsHovered(true)
						}}
						onMouseLeave={() => {
							setIsHovered(false)
						}}
						className="flex flex-col items-center justify-center"
					>
						<p className="mb-4 max-w-2xl text-center text-base font-semibold uppercase tracking-widest lg:text-lg ">
							Nandani Paliwal
						</p>
						<h1 className=" -space-y-2 text-center text-5xl font-bold uppercase sm:-space-y-4 sm:text-7xl lg:-space-y-6 lg:text-9xl ">
							<span className="block">National</span>
							<span className="block">level</span>
							<span className="block">Chess</span>
							<span className="block">Player</span>
						</h1>
					</div>

					{/* about section */}
					<div
						onMouseEnter={() => {
							setIsHovered(true)
						}}
						onMouseLeave={() => {
							setIsHovered(false)
						}}
						className="mt-48 flex flex-col px-4 md:px-0"
					>
						<p className="mb-4 text-left text-lg font-semibold uppercase tracking-[0.5em]">
							About Me
						</p>
						<h2 className=" max-w-5xl text-4xl font-bold text-black sm:text-5xl lg:text-7xl">
							National level Chess player who can move her queen and is good while
							playing with white.
						</h2>
					</div>
				</motion.div>

				{/* actual content */}
				<div className="actual-content flex h-full w-full flex-col items-center justify-center py-40 md:mx-11 md:px-14 lg:px-24">
					{/* hero section */}
					<div className="flex flex-col items-center justify-center">
						<p className="mb-4 max-w-2xl text-center text-base font-semibold uppercase tracking-widest text-gray-600 dark:text-secondary-400 lg:text-lg ">
							Nandani Paliwal
						</p>
						<h1 className="  -space-y-2 text-center text-5xl font-bold uppercase text-gray-600 dark:text-secondary-400 sm:-space-y-4 sm:text-7xl lg:-space-y-6 lg:text-9xl ">
							<span className="block">Pixel</span>
							<span className="block">Perfect</span>
							<span className="block text-primary-500">Frontend</span>
							<span className="block">Developer</span>
						</h1>
					</div>

					{/* about section */}
					<div className="mt-48 flex flex-col px-4 md:px-0">
						{' '}
						<p className="mb-4 text-left text-base font-semibold uppercase tracking-[0.5em] text-gray-600 dark:text-secondary-400 lg:text-lg">
							About Me
						</p>
						<h2 className=" max-w-5xl text-4xl font-bold text-gray-600 dark:text-secondary-400 sm:text-5xl lg:text-7xl">
							I&rsquo;m Frontend Developer who is leaning to create some awesome
							animations on the canvas.
						</h2>
					</div>
				</div>
				{/* socials section */}
				<Socials />
			</div>
		</main>
	)
}
