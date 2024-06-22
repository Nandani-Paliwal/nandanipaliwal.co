export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export const IS_STAGING = !IS_DEVELOPMENT && !IS_PRODUCTION

export const CANONICAL_SITE_DOMAIN = 'https://www.nandanipaliwal.co'

export const blurImageDimensions = { w: 400, h: 210 }

export const siteDescription =
	'As a passionate frontend engineer, I am highly into animation works. I like to build smooth UX via animations and visually appealing web interfaces. 🚀'

export const MetaTitle = 'Nandani Paliwal'

export const META_CATEGORY = [
	'Software Development ',
	'MVP development',
	'MVP design and development',
	'Agile Development',
	'MVP Products',
	'Agile Methodology MVP',
	'MVP Agile Development',
	'Frontend Development',
	'Web Development',
	'Software Engineering',
	'Interactive Web Design',
	'Responsive Design',
	'User Experience Design',
	'Freelance Developer',
	'Web Animations'
]

export const META_CLASSIFICATION = [
	'Technology Solutions',
	'MVP design and development Services',
	'Agile Development Services',
	'Technology',
	'MVP Products',
	'Frontend Development',
	'Web Development',
	'Software Engineering',
	'Interactive Web Design',
	'Responsive Design',
	'User Experience Design',
	'Freelance Developer',
	'Technology',
	'Software Development',
	'Frontend Engineering',
	'Web Design and Development',
	'Freelance Work',
	'Web Animations'
]

export const META_KEYWORDS = [
	'Software Development Engineer',
	'product development',
	'web development',
	'agile',
	'Frontend Developer',
	'Next.js Developer',
	'TypeScript Developer',
	'Framer Motion',
	'Tailwind CSS',
	'SEO Optimization',
	'Dynamic Web Applications',
	'Responsive Websites',
	'UI/UX Design',
	'Technical Content Writing',
	'Web Performance Optimization',
	'Web Animations'
]

export const HASHNODE_PUBLICATION_HOST = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST

export const HASHNODE_GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT

export const hashnodeEnv = process.env.NEXT_PUBLIC_HASHNODE_ENV

export const IS_SERVER = typeof window === 'undefined'

export const DEFAULT_LIGHT_POST_COVER =
	'https://cdn.hashnode.com/res/hashnode/image/upload/v1683525272978/MB5H_kgOC.png?auto=format'

export const DEFAULT_AVATAR =
	'https://cdn.hashnode.com/res/hashnode/image/upload/v1659089761812/fsOct5gl6.png'

export const NON_ASCII_REGEX = /[\u{0080}-\u{FFFF}]/gu
