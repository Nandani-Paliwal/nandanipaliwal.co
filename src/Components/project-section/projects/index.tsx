'use client'
import { useState } from 'react'
import Titles from './titles'
import Descriptions from './descriptions'
import { StringDecoder } from 'string_decoder'

const data = [
	{
		i: 1,
		title: 'Enseedling',
		description:
			'Developed enseedling.com using Next.js and TypeScript, with Framer Motion animations and Hashnode CMS, resulting in $350K sponsorship and significant performance and engagement improvements.',
		href: 'https://www.enseedling.com/',
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
		title: 'Goldman',
		description:
			'Integrated Typeform CMS for dynamic forms, enhancing engagement and data collection, and implemented an EMI calculator, increasing user session time by 30%.',
		href: 'https://goldmangroup.in',

		speed: 0.67
	},
	{
		i: 4,
		title: 'OppNexus',
		description:
			'Developed a MERN stack platform for job applications with real-time tracking, RESTful APIs, secure authentication, and MongoDB, enhancing full-stack development and web security skills.',
		href: 'https://opportunity-nexus.vercel.app/',

		speed: 0.8
	},
	{
		i: 5,
		title: 'GDSC',
		description:
			'Selected as Lead for the inaugural Google Developer Student Club at BU from 400 candidates, orchestrating 50+ events with industry experts to enhance community learning and engagement.',
		href: 'https://g.dev/nandanipaliwal',

		speed: 0.8
	},
	{
		i: 6,
		title: 'MLSA',
		description:
			'Mentored 100+ new MLSAs as Beta MLSA, organizing 10+ events on Git, GitHub, and React, leveraging both online and in-person formats.',
		href: 'https://mvp.microsoft.com/en-US/studentambassadors/profile/c652a88b-92a4-44f3-8389-32c28348d312',
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
