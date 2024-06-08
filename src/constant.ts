export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export const IS_STAGING = !IS_DEVELOPMENT && !IS_PRODUCTION

export const siteDescription =
	"Specializing in backend engineering and DevOps, I'm dedicated to transforming core ideas into high-performance digital realities.Streamlining development processes and building robust, scalable solutions.Let’s drive innovation together! 🚀"
