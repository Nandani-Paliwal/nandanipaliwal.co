export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export const IS_STAGING = !IS_DEVELOPMENT && !IS_PRODUCTION

export const CANONICAL_SITE_DOMAIN = 'https://www.nandanipaliwal.co'

export const blurImageDimensions = { w: 400, h: 210 }

export const siteDescription =
	'As a passionate frontend engineer, I am highly into animation works. I like to build smooth user experiences via animations and visually appealing web interfaces. 🚀'

export const MetaTitle = 'Nandani Paliwal'

export const META_CATEGORY = [
	'Software Development ',
	'MVP development',
	'SaaS Solutions',
	'MVP design and development',
	'Technology Consulting',
	'Startup Solutions',
	'Custom Software Development',
	'Minimum Viable Product Development Services',
	'Lean Startup',
	'Agile Development',
	'MVP Products',
	'Agile Methodology MVP',
	'MVP Agile Development'
]

export const META_CLASSIFICATION = [
	'Software Development Services',
	'Technology Solutions',
	'Startup Tech Support',
	'SaaS Product Development',
	'Custom IT Solutions',
	'Custom Software Development Services',
	'Minimum Viable Product Development Services',
	'Lean Startup',
	'MVP design and development Services',
	'Agile Development Services',
	'Business',
	'Technology',
	'MVP Products'
]

export const META_KEYWORDS = [
	'tech company',
	'IT service company',
	'IT consulting',
	'startup',
	'entrepreneurship',
	'product development',
	'software development company',
	'custom software solutions',
	'web development',
	'minimum viable product',
	'MVP development',
	'business growth',
	'brand building',
	'how to build an mvp',
	'building mvp in entrepreneurship',
	'building an mvp',
	'minimum viable product software',
	'mvp product',
	'agile methodology mvp',
	'ideate',
	'innovate',
	'elevate',
	'mvp agile development',
	'agile',
	'app development',
	'ai integration',
	'custom software development firm',
	'custom software development solutions',
	'custom healthcare software development',
	'custom software development service',
	'custom software development company in india'
]

export const ProductDescription =
	'Softlancer builds MVPs and other software solutions. We help startups in launching MVP via best product design thinking and agile methodology of development.'

export const HASHNODE_PUBLICATION_HOST = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST

export const HASHNODE_GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT

export const hashnodeEnv = process.env.NEXT_PUBLIC_HASHNODE_ENV

export const IS_SERVER = typeof window === 'undefined'

export const DEFAULT_LIGHT_POST_COVER =
	'https://cdn.hashnode.com/res/hashnode/image/upload/v1683525272978/MB5H_kgOC.png?auto=format'

export const DEFAULT_AVATAR =
	'https://cdn.hashnode.com/res/hashnode/image/upload/v1659089761812/fsOct5gl6.png'

export const NON_ASCII_REGEX = /[\u{0080}-\u{FFFF}]/gu
