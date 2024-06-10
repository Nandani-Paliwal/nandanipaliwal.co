'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export const MaskEffect = ({
	children,
	revealText,
	size = 40,
	revealSize = 400,
	className
}: {
	children?: string | React.ReactNode
	revealText?: string | React.ReactNode
	size?: number
	revealSize?: number
	className?: string
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0
	})
	const containerRef = useRef<any>(null)

	const updatePosition = (e: MouseEvent) => {
		const rect = containerRef.current.getBoundingClientRect()
		setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
	}
	useEffect(() => {
		containerRef.current.addEventListener('mousemove', updatePosition)
		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener('mousemove', updatePosition)
			}
		}
	}, [])

	let maskSize = isHovered ? revealSize : size

	return (
		<motion.div
			ref={containerRef}
			className={clsx('relative h-screen', className)}
			animate={{
				backgroundColor: isHovered ? 'var(--slate-900)' : 'var(--white)'
			}}
		>
			<motion.div
				className="bg-grid-white/[0.2] absolute flex h-screen w-screen items-center justify-center bg-primary-500  text-6xl text-white [mask-image:url(/assets/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px]"
				animate={{
					WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
						mousePosition.y - maskSize / 2
					}px`,
					WebkitMaskSize: `${maskSize}px`
				}}
				transition={{ type: 'tween', ease: 'backOut' }}
			>
				<div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50" />
				<div
					onMouseEnter={() => {
						setIsHovered(true)
					}}
					onMouseLeave={() => {
						setIsHovered(false)
					}}
					className="relative z-20 mx-auto max-w-4xl  text-center text-4xl font-bold text-white"
				>
					{children}
				</div>
			</motion.div>

			<div className="flex h-full w-full items-center justify-center  text-white">
				{revealText}
			</div>
		</motion.div>
	)
}
