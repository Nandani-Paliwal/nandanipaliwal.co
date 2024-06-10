import { produce } from 'immer'
import { create } from 'zustand'
import { type PostFragment, type PublicationFragment } from 'root/generated/graphql'

export type BlogStoreType = {
	publication: PublicationFragment | null
	post: PostFragment | null
	writeProperty: (
		updates: WritePropertyParamType | ((state?: BlogStoreType | undefined) => BlogStoreType)
	) => void
	resetStore: () => void
}

type WritePropertyParamType = {
	[K in keyof BlogStoreType]?: BlogStoreType[K]
}

const useBlogStore = create<BlogStoreType>(set => ({
	publication: null,
	post: null,
	writeProperty: updates => {
		if (typeof updates === 'object') {
			set(state => ({
				...state,
				...updates
			}))
		} else {
			set(state => produce<BlogStoreType>(state, updates))
		}
	},
	resetStore: () => {
		set(() => ({
			publication: null
		}))
	}
}))

export { useBlogStore }
