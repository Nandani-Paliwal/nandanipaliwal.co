import { produce } from 'immer'
import { create } from 'zustand'
import { type QuestionType } from '~/types'

const questions: QuestionType[] = [
	{
		question: 'What type of service you want? 💻',
		type: 'objective',
		slug: 'service',
		error: null,
		placeHolder: 'Product Design / Development',
		options: [
			{
				id: 'web',
				text: 'Web Development',
				isAnswer: false
			},
			{
				id: 'seo',
				text: 'Search Engine Optimization',
				isAnswer: false
			},
			{
				id: 'mobile-development',
				text: 'Mobile Development',
				isAnswer: false
			},
			{
				id: 'product',
				text: 'Product Design / Development',
				isAnswer: false
			},
			{
				id: 'consultancy',
				text: 'Technical Consultancy',
				isAnswer: false
			},
			{
				id: 'graphic',
				text: 'Graphic Designing / Marketing Video / Animated Videos',
				isAnswer: false
			},
			{
				id: 'devops',
				text: 'DevOps / Cloud Deployment and Management',
				isAnswer: false
			},
			{
				id: 'other',
				text: 'Other',
				isAnswer: false
			}
		]
	},
	{
		question: "What's your good name? 😀",
		type: 'subjective',
		answer: null,
		slug: 'name',
		inputType: 'text',
		error: null,
		placeHolder: 'John Doe'
	},
	{
		question: 'How do we contact you? 📧',
		type: 'subjective',
		slug: 'email',
		answer: null,
		error: null,
		placeHolder: 'john@gmail.com',
		inputType: 'text'
	},
	{
		question: 'Country 🌍',
		type: 'subjective',
		slug: 'country',
		answer: null,
		inputType: 'text',
		error: null,
		placeHolder: 'United States'
	},
	{
		question: 'Anything you would like us to prepare before our first interaction?📝',
		type: 'subjective',
		slug: 'description',
		inputType: 'text-area',
		answer: null,
		error: null,
		placeHolder: 'Please research on...'
	},
	{
		question: 'Do you have a referral code? 🤝',
		type: 'subjective',
		slug: 'referralCode',
		inputType: 'text',
		answer: null,
		error: null,
		placeHolder: 'DOE100'
	}
]

export type HireStoreType = {
	isFormSubmitted: boolean
	isFormBusy: boolean
	questions: QuestionType[]
	activeQuestionSlug: string
	writeProperty: (
		updates: WritePropertyParamType | ((draft: HireStoreType) => HireStoreType | void)
	) => void
	resetStore: () => void
}

type WritePropertyParamType = {
	[K in keyof HireStoreType]?: HireStoreType[K]
}

const useHireFormStore = create<HireStoreType>(set => ({
	isFormSubmitted: false,
	isFormBusy: false,
	activeQuestionSlug: questions[0].slug,
	questions: questions,
	writeProperty: updates => {
		if (typeof updates === 'function') {
			set(state => {
				const response = produce<HireStoreType>(state, updates)
				console.log({ response })
				return response
			})
		} else {
			set(state => ({ ...state, ...updates }))
		}
	},
	resetStore: () => {
		set(() => ({
			questions: questions,
			activeQuestionSlug: questions[0].slug,
			isFormBusy: false,
			isFormSubmitted: false
		}))
	}
}))

export { useHireFormStore }
