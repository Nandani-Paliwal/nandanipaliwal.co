'use client'
import { useState } from 'react'
import Titles from './titles'
import Descriptions from './descriptions'

const data = [
	{
		i: 1,
		title: 'Flatshare',
		description:
			'Developing a flatmate matching marketplace using Next.js, Tailwind CSS, and Zustand; established a scalable monorepo with Turborepo, reducing code duplicity by 30%, and set up Storybook, saving 40% development time and enhancing collaboration.',
		href: '',
		speed: 0.5
	},
	{
		i: 2,
		title: 'Softlancer',
		description:
			'Developed a dynamic, responsive website for Softlancer using Next.js, SSR for SEO, and Tailwind CSS, with Framer Motion animations and Lenis Smooth Scroll for enhanced UX, improving page speed by 80%.',
		href: 'https://www.softlancer.co/',

		speed: 0.5
	},
	{
		i: 3,
		title: 'Enseedling',
		description:
			'Developed enseedling.com using Next.js and TypeScript, with Framer Motion animations and Hashnode CMS, resulting in $350K sponsorship and significant performance and engagement improvements.',
		href: 'https://www.enseedling.com/',
		speed: 0.67
	},
	{
		i: 4,
		title: 'BathFitting',
		description:
			'Designed and launched a responsive e-commerce website for Bath Fitting Solution, enhancing their online presence. Integrated SMTP for direct inbox messaging, boosting user engagement. Added a filter feature, reducing search time by 20%.',
		href: 'https://www.bathfittingsolution.com/',
		speed: 0.8
	},
	{
		i: 5,
		title: 'OppNexus',
		description:
			'Developed a MERN stack platform for job applications with real-time tracking, RESTful APIs, secure authentication, and MongoDB, enhancing full-stack development and web security skills.',
		href: 'https://opportunity-nexus.vercel.app/',

		speed: 0.8
	},
	{
		i: 6,
		title: 'GDSC Lead',
		description:
			'Selected as Lead for the inaugural Google Developer Student Club at BU from 400 candidates, orchestrating 50+ events with industry experts to enhance community learning and engagement.',
		href: 'https://g.dev/nandanipaliwal',
		speed: 0.8
	}
]

export default function Projects() {
	const [selectedProject, setSelectedProject] = useState<number | null>(null)
	return (
		<div className="absolute z-10 w-full">
			<Titles data={data} setSelectedProject={setSelectedProject} />
			<Descriptions data={data} selectedProject={selectedProject} />
		</div>
	)
}
