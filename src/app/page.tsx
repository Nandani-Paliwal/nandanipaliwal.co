'use client'
import useMousePosition from '~/Components/ui/use-mouse-position'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Socials from '../Components/socials'
import ProjectSection from '~/Components/project-section'

export default function Home() {
	const [isHovered, setIsHovered] = useState(false)
	const { x, y } = useMousePosition()
	const size = isHovered ? 400 : 40

	return (
		<main className="">
			<div className="relative  flex h-full flex-col items-center justify-center md:mx-auto">
				<motion.div
					animate={{
						WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
						WebkitMaskSize: `${size}px`
					}}
					transition={{ type: 'tween', ease: 'backOut' }}
					className="mask  absolute top-0 flex h-fit  w-full flex-col items-center pb-32 pt-56 text-black md:mx-11 md:px-14 md:pb-44 lg:px-24 "
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
						<h2 className="-space-y-2 text-center text-[3.5rem] font-bold uppercase leading-none min-[375px]:text-[4rem] sm:-space-y-4 md:text-7xl lg:-space-y-6 lg:text-9xl ">
							<span className="block">Can</span>
							<span className="block">be a</span>
							<span className="block text-white">Generalist</span>
							<span className="block">at times</span>
						</h2>
					</div>

					{/* about section */}
					<div
						onMouseEnter={() => {
							setIsHovered(true)
						}}
						onMouseLeave={() => {
							setIsHovered(false)
						}}
						className="px-4lg:px-0 mt-32 flex w-fit flex-col text-left md:mt-48"
					>
						<p className="mb-4 text-lg font-semibold uppercase tracking-[0.5em]">
							About Me
						</p>
						<h2 className=" max-w-5xl text-4xl font-bold text-black sm:text-5xl lg:text-7xl">
							While focused on frontend development, I’m adaptable and eager to learn
							new technologies and trends, embracing challenges to ensure project
							success in any role.
						</h2>
					</div>
				</motion.div>

				{/* actual content */}
				<div className="actual-content flex h-fit w-full flex-col items-center pb-32 pt-56 md:mx-11  md:px-14 md:pb-44 lg:px-24 ">
					{/* hero section */}
					<div className="flex flex-col items-center justify-center">
						<p className="mb-4 max-w-2xl text-center text-base font-semibold uppercase tracking-widest text-gray-600 dark:text-secondary-400 lg:text-lg ">
							Nandani Paliwal
						</p>
						<h1 className="-space-y-2 text-center text-[3.5rem] font-bold uppercase leading-none  text-gray-600 dark:text-secondary-400 min-[375px]:text-[4rem] sm:-space-y-4 md:text-7xl lg:-space-y-6 lg:text-9xl">
							<span className="block">Pixel</span>
							<span className="block">Perfect</span>
							<span className="block text-primary-600">Frontend</span>
							<span className="block">Developer</span>
						</h1>
					</div>

					{/* about section */}
					<div className="mt-32 flex flex-col px-4 text-left md:mt-48 lg:px-0">
						{' '}
						<p className="mb-4  text-base font-semibold uppercase tracking-[0.5em] text-gray-600 dark:text-secondary-400 lg:text-lg">
							About Me
						</p>
						<h2 className=" max-w-5xl text-4xl font-bold text-gray-600 dark:text-secondary-400 sm:text-5xl lg:text-7xl">
							As a passionate frontend engineer, I craft smooth, user-centric
							experiences with visually appealing animations while staying updated on
							the latest industry trends.
						</h2>
					</div>
				</div>

				{/* Project Section */}
				<ProjectSection />

				{/* socials section */}
				<Socials />
			</div>
		</main>
	)
}
