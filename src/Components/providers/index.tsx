'use client'
import { type ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: ReactNode }) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <>{children}</>
	}

	return (
		<ThemeProvider storageKey="preferred-theme" attribute="class">
			{children}
		</ThemeProvider>
	)
}
