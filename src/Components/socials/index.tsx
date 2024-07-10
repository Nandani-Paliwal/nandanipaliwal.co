import Link from 'next/link'
import FramerMagnetic from '~/Components/ui/framer-magnetic'
import React, { type SVGAttributes } from 'react'

const socialList = [
	{
		name: 'GitHub',
		href: 'https://github.com/nandani-paliwal',
		icon: (props: SVGAttributes<SVGElement>) => (
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="h-10 w-10 text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.1727 20.8173 18.8977 19.5415 20.1198 17.8395C21.3419 16.1376 21.9995 14.0953 22 12C22 6.475 17.525 2 12 2Z" />
			</svg>
		)
	},
	{
		name: 'Peerlist',
		href: 'https://peerlist.io/nandanipaliwal',
		icon: (props: SVGAttributes<SVGElement>) => (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				className="h-9 w-9"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3.10518 3.10518C1.53658 4.67378 0.855183 7.34909 0.855183 12C0.855183 16.6509 1.53658 19.3262 3.10518 20.8948C4.67378 22.4634 7.35366 23.1448 11.9954 23.1448C16.6372 23.1448 19.3171 22.4634 20.8857 20.8948C22.4543 19.3262 23.1357 16.6509 23.1357 12C23.1357 7.34909 22.4543 4.67378 20.8857 3.10518C19.3262 1.53659 16.6463 0.855183 12 0.855183C7.35366 0.855183 4.67378 1.53659 3.10518 3.10518ZM0 12C0 2.66616 2.66616 0 12 0C21.3293 0 24 2.66616 24 12C24 21.3338 21.3247 24 12 24C2.6753 24 0 21.3338 0 12Z"
					fill="currentColor"
					className="text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				/>
				<path
					d="M10.4541 16.029H9.95408V16.529V19.0747H6.92969V5.5H11.6065C14.6273 5.5 17.0745 7.86385 17.0745 10.7668C17.0745 13.6692 14.6278 16.029 11.6065 16.029H10.4541ZM9.95408 12.6189V13.1189H10.4541H11.6065C12.9545 13.1189 14.0501 12.0653 14.0501 10.7622C14.0501 9.45907 12.9545 8.40549 11.6065 8.40549H10.4541H9.95408V8.90549V12.6189Z"
					stroke="currentColor"
					className="text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M6 5.42969H11.1768C14.4604 5.42969 17.1448 7.99066 17.1448 11.1919C17.1448 14.3931 14.4558 16.9541 11.1768 16.9541H10.0244V19.9998H6V5.42969ZM6.85976 6.28487V19.1446H9.16921V16.0989H11.1814C14.0213 16.0989 16.2896 13.8855 16.2896 11.1919C16.2896 8.49829 14.0168 6.28487 11.1814 6.28487H6.85976ZM9.16921 8.47542H11.1814C12.7134 8.47542 13.9848 9.67359 13.9848 11.1919C13.9848 12.7056 12.7134 13.9083 11.1814 13.9083H9.16921V8.47542ZM10.0244 9.3306V13.044H11.1768C12.2652 13.044 13.1204 12.198 13.1204 11.1873C13.1204 10.1766 12.2652 9.3306 11.1768 9.3306H10.0244Z"
					fill="currentColor"
					className="text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				/>
			</svg>
		)
	},
	{
		name: 'Linkedin',
		href: 'https://www.linkedin.com/in/nandanipaliwal',
		icon: (props: SVGAttributes<SVGElement>) => (
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="h-10 w-10 text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path d="M7.02814 19.8291H3.44995V8.07215H7.13038V19.8291H7.02814ZM5.18793 6.43641C4.06336 6.43641 3.04102 5.5163 3.04102 4.28949C3.04102 3.16492 3.96112 2.14258 5.18793 2.14258C6.31251 2.14258 7.33485 3.06268 7.33485 4.28949C7.33485 5.5163 6.41474 6.43641 5.18793 6.43641ZM20.7275 19.8291H17.0471V14.104C17.0471 12.7749 17.0471 11.0369 15.2069 11.0369C13.2644 11.0369 13.06 12.4682 13.06 14.0017V19.8291H9.37953V8.07215H12.8555V9.7079C13.3667 8.78779 14.4912 7.86769 16.3314 7.86769C20.0119 7.86769 20.7275 10.3213 20.7275 13.4906V19.8291Z" />
			</svg>
		)
	},
	{
		name: 'X',
		href: 'https://twitter.com/Nandanipaliwal',
		icon: (props: SVGAttributes<SVGElement>) => (
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="h-10 w-10 text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path d="M13.1173 10.1983L19.4459 3H17.9463L12.4511 9.25022L8.06215 3H3L9.63697 12.4514L3 20H4.49977L10.3028 13.3996L14.9379 20H20L13.1169 10.1983H13.1173ZM11.0632 12.5347L10.3907 11.5936L5.04016 4.10473H7.34371L11.6617 10.1485L12.3341 11.0896L17.947 18.9455H15.6434L11.0632 12.5351V12.5347Z" />
			</svg>
		)
	},
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/paliwal.nandani/',
		icon: (props: SVGAttributes<SVGElement>) => (
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="h-10 w-10 text-gray-600 hover:text-primary-950 dark:text-secondary-400 dark:hover:text-primary-950"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path d="M17.0902 2.6665H6.90845C6.35132 2.6665 5.79966 2.77624 5.28494 2.98944C4.77023 3.20264 4.30254 3.51514 3.9086 3.90908C3.11299 4.70469 2.66602 5.78377 2.66602 6.90893V17.0907C2.66602 17.6479 2.77576 18.1995 2.98896 18.7143C3.20216 19.229 3.51465 19.6966 3.9086 20.0906C4.70421 20.8862 5.78329 21.3332 6.90845 21.3332H17.0902C17.6474 21.3332 18.199 21.2234 18.7137 21.0102C19.2285 20.797 19.6961 20.4845 20.0901 20.0906C20.484 19.6966 20.7965 19.229 21.0097 18.7143C21.2229 18.1995 21.3327 17.6479 21.3327 17.0907V6.90893C21.3327 6.3518 21.2229 5.80014 21.0097 5.28542C20.7965 4.77071 20.484 4.30303 20.0901 3.90908C19.6961 3.51514 19.2285 3.20264 18.7137 2.98944C18.199 2.77624 17.6474 2.6665 17.0902 2.6665ZM6.05996 6.90893C5.89215 6.90893 5.7281 6.85917 5.58857 6.76593C5.44904 6.6727 5.34028 6.54018 5.27606 6.38514C5.21184 6.2301 5.19504 6.0595 5.22778 5.89491C5.26052 5.73032 5.34133 5.57914 5.45999 5.46047C5.57865 5.34181 5.72984 5.261 5.89443 5.22826C6.05902 5.19552 6.22962 5.21233 6.38466 5.27655C6.5397 5.34076 6.67222 5.44952 6.76545 5.58905C6.85868 5.72858 6.90845 5.89263 6.90845 6.06044C6.90845 6.28548 6.81905 6.50129 6.65993 6.66041C6.50081 6.81953 6.28499 6.90893 6.05996 6.90893ZM11.9993 17.0907C10.9924 17.0907 10.0082 16.7922 9.171 16.2328C8.3338 15.6734 7.68129 14.8783 7.29597 13.948C6.91065 13.0178 6.80983 11.9942 7.00627 11.0066C7.2027 10.0191 7.68756 9.112 8.39954 8.40002C9.11152 7.68804 10.0186 7.20318 11.0061 7.00675C11.9937 6.81031 13.0173 6.91113 13.9475 7.29645C14.8778 7.68177 15.6729 8.33428 16.2323 9.17148C16.7917 10.0087 17.0902 10.993 17.0902 11.9998C17.0902 13.35 16.5539 14.6449 15.5991 15.5997C14.6444 16.5544 13.3495 17.0907 11.9993 17.0907Z" />
			</svg>
		)
	}
]

export default function Socials() {
	return (
		<>
			<section className="fixed bottom-6 left-2 z-[1000] hidden md:block lg:left-10">
				<div className="flex flex-col items-center justify-center space-y-5">
					{' '}
					{socialList.map((social, index) => (
						<Link href={social.href} target="blank" key={index}>
							<FramerMagnetic>
								<social.icon aria-hidden="true" />
							</FramerMagnetic>
						</Link>
					))}
				</div>
			</section>
			<section className="flex py-10 md:hidden">
				<div className="flex items-center justify-between space-x-5">
					{' '}
					{socialList.map((social, index) => (
						<Link href={social.href} target="blank" key={index}>
							<FramerMagnetic>
								<social.icon aria-hidden="true" />
							</FramerMagnetic>
						</Link>
					))}
				</div>
			</section>
		</>
	)
}
