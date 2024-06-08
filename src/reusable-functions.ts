import { type BlogPostType } from './types'

export const getBlogs = async (count: number) => {
	const query = {
		query: `query { publication(host: "sarthakjdev.hashnode.dev"){  posts(first: ${count}){edges{node {
	id       
	title      
	slug   
	url    
	canonicalUrl    
	coverImage {         
		url        
	}       
	subtitle        
	brief     
	readTimeInMinutes 
	publishedAt      
	author {        
		id           
		username     
		name       
		profilePicture      
	}   
}}}}}`
	}

	const blogs = await fetch('https://gql.hashnode.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query),
		cache: 'force-cache'
	}).then(res => res.json())

	return blogs.data.publication.posts.edges.map((item: any) => {
		const post = item.node

		return {
			id: post.id,
			title: post.title,
			slug: post.slug,
			url: post.url,
			canonicalUrl: post.canonicalUrl,
			coverImageUrl: post.coverImage.url,
			subtitle: post.subtitle,
			brief: post.brief,
			readTimeInMinutes: post.readTimeInMinutes,
			author: {
				name: post.author.name,
				profilePictureUrl: post.author.profilePicture,
				username: post.author.username
			},
			publishedAt: post.publishedAt
		}
	}) as BlogPostType[]
}
