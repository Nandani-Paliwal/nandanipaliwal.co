import React, { useRef } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import { useScroll, motion, useTransform, useMotionTemplate } from 'framer-motion'

export default function index({
	data,
	setSelectedProject
}: {
	data: { i: number; title: string; description: string; href: string; speed: number }[]
	setSelectedProject: (index: number | null) => void
}) {
	return (
		<div className={styles.titles}>
			{data.map(
				(project: { i: number; title: string; href: string; speed: number }, i: number) => {
					return (
						<Title
							key={i}
							data={{ ...project, i }}
							setSelectedProject={setSelectedProject}
						/>
					)
				}
			)}
		</div>
	)
}

function Title({
	data,
	setSelectedProject
}: {
	data: { i: number; title: string; href: string; speed: number }
	setSelectedProject: (index: number | null) => void
}) {
	const { title, href, speed, i } = data
	const container = useRef(null)

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', `${25 / speed}vw end`]
	})

	const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0])
	const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`

	return (
		<div ref={container} className={styles.title}>
			<div
				className={styles.wrapper}
				onMouseOver={() => {
					setSelectedProject(i)
				}}
				onMouseLeave={() => {
					setSelectedProject(null)
				}}
			>
				<Link href={href} target="blank" className="h-full">
					<motion.p style={{ clipPath: clip }}>{title}</motion.p>
					<p className="">{title}</p>
				</Link>
			</div>
		</div>
	)
}
