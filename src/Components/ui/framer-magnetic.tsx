'use client'
import { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import React, { type ReactNode } from 'react'

interface FramerMagenticProps {
	children: ReactNode
}

const FramerMagentic: React.FC<FramerMagenticProps> = ({ children }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0
	})
	// const [isHovered, setIsHovered] = useState(false)
	// const cursorSize = isHovered ? 60 : 40

	const scale = {
		x: useMotionValue(1),
		y: useMotionValue(1)
	}

	const mouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY } = e
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { width, height, left, top } = ref.current!.getBoundingClientRect()
		const x = clientX - (left + width / 2)
		const y = clientY - (top + height / 2)
		setPosition({ x, y })
	}

	const mouseLeave = () => {
		setPosition({ x: 0, y: 0 })
	}

	const { x, y } = position
	return (
		<motion.div
			onMouseMove={mouseMove}
			onMouseLeave={mouseLeave}
			ref={ref}
			style={{
				scaleX: scale.x,
				scaleY: scale.y
			}}
			// animate={{
			//   width: cursorSize,
			//   height: cursorSize
			// }}
			animate={{ x, y }}
			transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
		>
			{children}
		</motion.div>
	)
}

export default FramerMagentic
