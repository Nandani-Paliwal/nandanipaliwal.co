import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export function useLocalStorageState<T = string | null>(params: {
	key: string
	defaultValue?: T
}): [T | null, Dispatch<SetStateAction<T | null>>] {
	const { defaultValue, key } = params

	const [value, setValue] = useState<T | null>(() => {
		if (typeof window !== 'undefined') {
			const storedValue = window.localStorage.getItem(key)
			if (storedValue) {
				try {
					return JSON.parse(storedValue)
				} catch (error) {
					return storedValue
				}
			} else if (defaultValue) {
				defaultValue
			} else {
				return null
			}
		}

		return null
	})

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (value === null) {
				window.localStorage.removeItem(key)
			} else {
				window.localStorage.setItem(key, JSON.stringify(value))
			}
		}
	}, [key, value])

	return [value, setValue]
}
