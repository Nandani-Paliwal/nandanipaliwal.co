import Link from 'next/link'
import React, { type SVGAttributes } from 'react'
import { usePathname } from 'next/navigation'

const navigation = {
	social: [
		{
			name: 'Twitter',
			href: 'https://x.com/Nandanipaliwal',
			icon: (props: SVGAttributes<SVGElement>) => (
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					className="h-6 w-6"
					aria-hidden="true"
					height="24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
					{...props}
				>
					<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"></path>
				</svg>
			)
		},
		{
			name: 'GitHub',
			href: 'https://github.com/nandani-paliwal',
			icon: (props: SVGAttributes<SVGElement>) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props} className="h-6 w-6">
					<path
						fillRule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clipRule="evenodd"
					/>
				</svg>
			)
		},
		{
			name: 'Linkedin',
			href: 'https://www.linkedin.com/in/nandanipaliwal',
			icon: (props: SVGAttributes<SVGElement>) => (
				<svg
					className="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					{...props}
				>
					<path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
				</svg>
			)
		},
		{
			name: 'Peerlist',
			href: 'https://peerlist.io/nandanipaliwal',
			icon: (props: SVGAttributes<SVGElement>) => (
				<svg
					width="56"
					height="56"
					className="h-6 w-6"
					viewBox="0 0 56 56"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					{...props}
				>
					<path
						d="M28 0C6.22222 0 0 6.22222 0 28C0 49.7778 6.23778 56 28 56C49.7622 56 56 49.7778 56 28C56 6.22222 49.7622 0 28 0Z"
						fill="none"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7.24755 7.24755C3.5875 10.9076 2 17.153 2 28C2 38.8461 3.59108 45.0918 7.25306 48.7521C10.9153 52.4127 17.1612 54 28 54C38.8388 54 45.0847 52.4127 48.7469 48.7521C52.4089 45.0918 54 38.8461 54 28C54 17.1539 52.4089 10.9082 48.7469 7.24787C45.0847 3.58733 38.8388 2 28 2C17.153 2 10.9076 3.5875 7.24755 7.24755ZM0 28C0 6.22222 6.22222 0 28 0C49.7622 0 56 6.22222 56 28C56 49.7778 49.7622 56 28 56C6.23778 56 0 49.7778 0 28Z"
						fill="currentColor"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M27.0769 13H15V47H24.3846V39.8889H27.0769C34.7305 39.8889 41 33.9048 41 26.4444C41 18.984 34.7305 13 27.0769 13ZM24.3846 30.7778V22.1111H27.0769C29.6194 22.1111 31.6154 24.0864 31.6154 26.4444C31.6154 28.8024 29.6194 30.7778 27.0769 30.7778H24.3846Z"
						fill="currentColor"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M18 12H29.0769C36.2141 12 42 17.5716 42 24.4444C42 31.3173 36.2141 36.8889 29.0769 36.8889H25.3846V44H18V12ZM25.3846 29.7778H29.0769C32.1357 29.7778 34.6154 27.39 34.6154 24.4444C34.6154 21.4989 32.1357 19.1111 29.0769 19.1111H25.3846V29.7778Z"
						fill="none"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M17 11H29.0769C36.7305 11 43 16.984 43 24.4444C43 31.9048 36.7305 37.8889 29.0769 37.8889H26.3846V45H17V11ZM19 13V43H24.3846V35.8889H29.0769C35.6978 35.8889 41 30.7298 41 24.4444C41 18.1591 35.6978 13 29.0769 13H19ZM24.3846 18.1111H29.0769C32.6521 18.1111 35.6154 20.9114 35.6154 24.4444C35.6154 27.9775 32.6521 30.7778 29.0769 30.7778H24.3846V18.1111ZM26.3846 20.1111V28.7778H29.0769C31.6194 28.7778 33.6154 26.8024 33.6154 24.4444C33.6154 22.0864 31.6194 20.1111 29.0769 20.1111H26.3846Z"
						fill="currentColor"
					/>
				</svg>
			)
		}
	]
}

const Footer = () => {
	const pathname = usePathname()

	return (
		<footer className="bg-none">
			<div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
				{pathname.startsWith('/blog') ? (
					<div className="mt-8 flex justify-center space-x-6">
						{navigation.social.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className="text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">{item.name}</span>
								<item.icon aria-hidden="true" />
							</Link>
						))}
					</div>
				) : null}
				<p className="mt-8 text-center text-base font-semibold text-gray-600 dark:text-secondary-400">
					Design inspired by the brilliant work of Minh Pham -
					<Link
						href="https://minhpham.design/"
						target="blank"
						className="text-primary-600"
					>
						minhpham.design
					</Link>
					. | &copy; {new Date().getFullYear()} Rights Reserved
				</p>
			</div>
		</footer>
	)
}

export default Footer
