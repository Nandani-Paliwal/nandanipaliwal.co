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

export enum EmailTemplateKeyMapEnum {
	PitchEmail = '2518b.3d6d6aafb830e0e7.k1.48f81d81-8cea-11ee-aa03-525400b0b0f3.18c0f5d8754',
	WelcomeEmail = '2518b.3d6d6aafb830e0e7.k1.41cf4420-87ef-11ee-aa03-525400b0b0f3.18beeb98162'
}

export enum ImageAlignmentEnum {
	Center = 'center',
	Left = 'left',
	Right = 'right'
}

export enum PlayerTriggerStateEnum {
	Hover = 'hover',
	Click = 'click',
	Loop = 'loop',
	LoopOnHover = 'loop-on-hover'
}

export interface AnimatedIconPlayerProps {
	iconSrc: string
	size: number
	trigger: PlayerTriggerStateEnum
	color: string
}
