import { useEffect, useState } from 'react'

i

export default function useMousePosition() {
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0
	})

	useEffect(() => {
		const updatePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY })
		}
		const handleScroll = () => {
			setMousePosition(prevPos => ({
				x: prevPos.x,
				y: prevPos.y + window.scrollY
			}))
		}

		window.addEventListener('mousemove', updatePosition)
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('mousemove', updatePosition)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return mousePosition
}
