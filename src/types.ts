export type BlogPostType = {
	id: string
	title: string
	slug: string
	url: string
	canonicalUrl: string
	coverImageUrl: string
	subtitle: string
	brief: string
	readTimeInMinutes: number
	author: {
		name: string
		profilePictureUrl: string
		username: string
	}
	publishedAt: string
}
