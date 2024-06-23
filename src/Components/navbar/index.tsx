'use client'

import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../design-system/button'
import Navlinks from './nav-links'
import { type SVGAttributes } from 'react'
import ToggleTheme from '../toggle-theme'

function MenuIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M5 6h14M5 18h14M5 12h14"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function ChevronUpIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M17 14l-5-5-5 5"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function MobileNavLink({ children, ...props }: any) {
	return (
		<Popover.Button
			as={Link}
			className="block text-base leading-7 tracking-tight text-slate-700 transition-colors delay-150 hover:text-slate-500  hover:delay-[0ms] dark:text-slate-300  dark:hover:text-slate-500 "
			{...props}
		>
			{children}
		</Popover.Button>
	)
}

const Header = () => {
	return (
		<header className="fixed z-[9999] w-full bg-transparent">
			<nav className="mx-auto max-w-xl md:max-w-2xl xl:max-w-7xl">
				<div className="relative z-50 mx-3  mt-5 flex items-center justify-between rounded-full border border-dark bg-white px-2 py-2 dark:bg-secondarydark sm:px-8">
					<div className="relative z-10 flex items-center gap-16">
						<Link href="/" aria-label="Home">
							<h2 className="text-lg font-bold tracking-tighter text-primary-600">
								nandanipaliwal
							</h2>
						</Link>
						<div className="hidden lg:flex lg:gap-10">
							<Navlinks />
						</div>
					</div>
					<span className="flex lg:hidden">
						<ToggleTheme />
					</span>
					<div className="flex items-center gap-6">
						<Link
							href="https://cal.com/nandanipaliwal"
							className="hidden lg:flex"
							target="_blank"
						>
							<Button variant={'outline'}>Hire for work</Button>
						</Link>
						<span className="hidden lg:flex">
							<ToggleTheme />
						</span>
						<Popover className="lg:hidden">
							{({ open }) => (
								<>
									<Popover.Button
										className="relative z-10  inline-flex items-center justify-center rounded-full border-none stroke-slate-700 p-1 dark:stroke-slate-300 dark:hover:bg-dark dark:active:bg-dark [&:not(:focus-visible)]:focus:outline-none"
										aria-label="Toggle site navigation"
									>
										{({ open }) =>
											open ? (
												<ChevronUpIcon className="h-5 w-5 " />
											) : (
												<MenuIcon className="h-5 w-5" />
											)
										}
									</Popover.Button>
									<AnimatePresence initial={false}>
										{open && (
											<>
												<Popover.Overlay
													static
													as={motion.div}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
												/>

												<Popover.Panel
													static
													as={motion.div}
													initial={{ opacity: 0, y: -32 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{
														opacity: 0,
														y: -32,
														transition: { duration: 0.2 }
													}}
													className="absolute inset-x-0 top-20 z-0 origin-top rounded-2xl border border-dark bg-white px-6 py-6 shadow-2xl shadow-gray-900/20 dark:bg-secondarydark"
												>
													<div className="flex flex-col items-center justify-center space-y-2">
														<MobileNavLink href="/blog" target="_blank">
															Blogs
														</MobileNavLink>
														<MobileNavLink
															href="/resume.pdf"
															target="_blank"
														>
															Resume
														</MobileNavLink>

														<div className="flex items-center justify-center rounded-full">
															<Link
																href="https://cal.com/nandanipaliwal"
																target="_blank"
															>
																<Button variant={'outline'}>
																	Hire for work
																</Button>
															</Link>
														</div>
													</div>
												</Popover.Panel>
											</>
										)}
									</AnimatePresence>
								</>
							)}
						</Popover>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
