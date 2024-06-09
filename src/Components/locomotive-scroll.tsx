'use client'

import { useEffect } from 'react'

const LocomotiveScroll = () => {
	useEffect(() => {
		;(async () => {
			const locomotiveScroll = (await import('locomotive-scroll')).default
			new locomotiveScroll({
				smooth: true
			})
		})().catch(error => console.error(error))
	}, [])

	return null
}

export default LocomotiveScroll
