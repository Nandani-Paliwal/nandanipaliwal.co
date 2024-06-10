import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const NavLinks = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

	const navigation = [{ label: 'Blogs', href: '/blog' }]

	return (
		<>
			{navigation.map((item, index) => (
				<Link
					key={item.label}
					href={item.href}
					className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors delay-150 hover:text-slate-500 hover:delay-[0ms] dark:text-secondary-400  dark:hover:text-secondary-500"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === index && (
							<motion.span
								className="absolute inset-0 rounded-lg"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.15 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 }
								}}
							/>
						)}
					</AnimatePresence>
					<span className="relative z-10">{item.label}</span>
				</Link>
			))}
		</>
	)
}

export default NavLinks
