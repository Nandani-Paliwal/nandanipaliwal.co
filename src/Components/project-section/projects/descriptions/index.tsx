import React from 'react'
import styles from './style.module.scss'

export default function index({
	data,
	selectedProject
}: {
	data: [{ i: number; title: string; description: string; href: string; speed: number }]
	selectedProject: number | null
}) {
	const crop = (string: string, maxLength: number) => {
		return string.substring(0, maxLength)
	}

	return (
		<div className={styles.descriptions}>
			{data.map((project, i: number) => {
				const { title, description } = project
				return (
					<div
						key={i}
						className={styles.description}
						style={{
							clipPath: selectedProject == i ? 'inset(0 0 0)' : 'inset(50% 0 50%'
						}}
					>
						<p>{crop(title, 9)}</p>
						<p>{description}</p>
					</div>
				)
			})}
		</div>
	)
}
