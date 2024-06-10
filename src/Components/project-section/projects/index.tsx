'use client'
import { useState } from 'react'
import Titles from './titles'
import Descriptions from './descriptions'

const data = [
	{
		title: 'Enseedling',
		description:
			'Developed enseedling.com using Next.js and TypeScript, with Framer Motion animations and Hashnode CMS, resulting in $350K sponsorship and significant performance and engagement improvements.',
		speed: 0.5
	},
	{
		title: 'Softlancer',
		description:
			'Developed a dynamic, responsive website for Softlancer using Next.js, SSR for SEO, and Tailwind CSS, with Framer Motion animations and Lenis Smooth Scroll for enhanced UX, improving page speed by 80%.',

		speed: 0.5
	},
	{
		title: 'Goldman',
		description:
			'Integrated Typeform CMS for dynamic forms, enhancing engagement and data collection, and implemented an EMI calculator, increasing user session time by 30%.',

		speed: 0.67
	},
	{
		title: 'OppNexus',
		description:
			'Developed a MERN stack platform for job applications with real-time tracking, RESTful APIs, secure authentication, and MongoDB, enhancing full-stack development and web security skills.',

		speed: 0.8
	},
	{
		title: 'GDSC',
		description:
			'Selected as Lead for the inaugural Google Developer Student Club at BU from 400 candidates, orchestrating 50+ events with industry experts to enhance community learning and engagement.',

		speed: 0.8
	},
	{
		title: 'MLSA',
		description:
			'Mentored 100+ new MLSAs as Beta MLSA, organizing 10+ events on Git, GitHub, and React, leveraging both online and in-person formats.',
		speed: 0.8
	}
]

export default function Projects() {
	const [selectedProject, setSelectedProject] = useState(null)
	return (
		<div className="absolute z-10 w-full">
			<Titles data={data} setSelectedProject={setSelectedProject} />
			<Descriptions data={data} selectedProject={selectedProject} />
		</div>
	)
}
