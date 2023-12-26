import Image from "next/image";

import { Fragment } from 'react'

export default function Home() {
  return (
    <main>
			{/* hero section */}
			<div className="mx-auto flex max-w-2xl flex-col items-center justify-evenly pt-24 text-gray-800 lg:pb-5 xl:max-w-7xl xl:flex-row-reverse xl:justify-center xl:pt-24">
				<div className="relative mb-10 flex select-none px-10 xl:mb-16">
					<Image
						alt="My profile photo"
						loading="lazy"
						width="300"
						height="300"
						className="aspect-square rounded-full object-contain"
						src={'/avatar.png'}
					/>
				</div>
				<div className="flex flex-col text-center xl:mr-20 xl:text-left">
					<div className="mb-2">
						<h1 className="mb-2 text-4xl font-bold md:text-5xl dark:text-white text-black">Nandani Paliwal</h1>
						<h2 className="mb-4 text-xl font-semibold">
            Frontend Developer | GDSC Lead | MLSA
						</h2>
					</div>
					<p className="font-content mb-8 max-w-2xl whitespace-break-spaces text-lg font-semibold text-gray-600 lg:leading-relaxed">
          Frontend Developer who converts your designs to a pixel fit UI.
					</p>
				</div>
			</div>

			{/* Works and products developed */}
			{/* <Works /> */}

			{/* blogs */}
			{/* <Blogs /> */}
		</main>
  )
}
