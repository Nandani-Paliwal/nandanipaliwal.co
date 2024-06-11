import { type Metadata } from 'next'
import Link from 'next/link'
import Button from '~/Components/design-system/button'

export const metadata: Metadata = { robots: 'noindex, nofollow' }

export default function NotFoundPage() {
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 dark:bg-[#121212] sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-[8rem] font-bold uppercase leading-none text-primary-600 min-[375px]:text-[10rem] md:text-[15rem]  xl:text-[20rem]">
					404
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600 dark:text-secondary-400">
					Looks like we've hit a snag! This page seems to be on vacation.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link title="home" href={'/'}>
						<Button>Back to Home</Button>
					</Link>
				</div>
			</div>
		</main>
	)
}
