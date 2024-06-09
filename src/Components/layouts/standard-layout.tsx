'use client'

import React from 'react'
import Providers from '../providers'

import Header from '../navbar'
import LocomotiveScroll from '../locomotive-scroll'
import Footer from '../footer'

const StandardLayout: React.FC<
	React.PropsWithChildren<{
		navbarProps?: { transparent: boolean }
	}>
> = ({ children }) => {
	return (
		<div className="root min-h-screen">
			<div
				id="layout-mid-container"
				className=" relative flex min-h-screen flex-1 overflow-clip"
			>
				<div
					id="layout-desktop-content-container"
					className="flex min-h-screen w-full flex-1 flex-col"
				>
					<Providers>
						<LocomotiveScroll />
						<Header />
						{children}
						<div className="md:hidden">
							<Footer />
						</div>
					</Providers>
				</div>
			</div>
		</div>
	)
}

export default StandardLayout
