import { type BlogPostType } from './types'

import {
	CANONICAL_SITE_DOMAIN,
	DEFAULT_LIGHT_POST_COVER
	// IS_PRODUCTION,
	// ValidPhoneNumberRegex,
	// hashnodeEnv,
	// isBrowser,
	// validEmailRegex,
	// validUsernameRegex,
} from './constant'

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

export const addPublicationJsonLd = (publication: any) => {
	const schema = {
		'@context': 'https://schema.org/',
		'@type': 'Blog',
		'@id': `${CANONICAL_SITE_DOMAIN}/blog/`,
		mainEntityOfPage: `${CANONICAL_SITE_DOMAIN}/blog/`,
		name: publication.title,
		description: publication.descriptionSEO,
		publisher: {
			'@type': 'Organization',
			'@id': `${CANONICAL_SITE_DOMAIN}/blog/`,
			name: publication.title,
			image: {
				'@type': 'ImageObject',
				url: publication.preferences?.logo
			}
		}
	}
	return schema
}

export const getDefaultPostCoverImageUrl = () => {
	return DEFAULT_LIGHT_POST_COVER
}

export function getPostUrl(slug: string) {
	return `/blog/${slug}`
}

export function getAbsolutePostUrl(slug: string) {
	return `${CANONICAL_SITE_DOMAIN}/blog/${slug}`
}
