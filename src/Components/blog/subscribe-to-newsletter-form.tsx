import { request } from 'graphql-request'
import { useRef, useState } from 'react'
import {
	NewsletterSubscribeStatus,
	SubscribeToNewsletterDocument,
	type SubscribeToNewsletterMutation,
	type SubscribeToNewsletterMutationVariables,
	type SubscribeToNewsletterPayload
} from 'root/generated/graphql'
import { HASHNODE_GQL_ENDPOINT } from '~/constant'
import { useBlogStore } from '~/store/blog-store'

export const SubscribeForm = () => {
	const [status, setStatus] = useState<SubscribeToNewsletterPayload['status']>()
	const [requestInProgress, setRequestInProgress] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const publication = useBlogStore(state => state.publication)

	if (!publication) throw new Error('publication not found')

	const subscribe = async () => {
		if (!HASHNODE_GQL_ENDPOINT) {
			throw new Error('HASHNODE_GQL_ENDPOINT not found')
		}

		const email = inputRef.current?.value
		if (!email) return

		setRequestInProgress(true)

		try {
			const data = await request<
				SubscribeToNewsletterMutation,
				SubscribeToNewsletterMutationVariables
			>(HASHNODE_GQL_ENDPOINT, SubscribeToNewsletterDocument, {
				input: { publicationId: publication?.id, email }
			})
			setRequestInProgress(false)
			setStatus(data.subscribeToNewsletter.status)
		} catch (error) {
			const message = (error as any).response?.errors?.[0]?.message
			if (message) {
				window.alert(message)
			}
			setRequestInProgress(false)
		}
	}
	return (
		<>
			{!status && (
				<div className="relative w-full rounded-full bg-white p-2 dark:bg-neutral-950">
					<input
						ref={inputRef}
						type="email"
						placeholder="john@doe.com"
						className="left-3 top-3 w-full rounded-full p-3 text-base text-secondary-900 outline-none focus:outline-primary-600 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:outline-primary-600"
					/>
					<button
						disabled={requestInProgress}
						onClick={subscribe}
						className="absolute right-3 top-3 rounded-full bg-primary-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-80 dark:bg-primary-600"
					>
						Subscribe
					</button>
				</div>
			)}
			{status === NewsletterSubscribeStatus.Pending && (
				<div className="relative w-full p-2 text-center">
					<p className="font-bold text-green-600 dark:text-green-500">Almost there!</p>
					<p className="font-medium text-slate-600 dark:text-neutral-300">
						Check your inbox for a confirmation email and click{' '}
						<strong>&quot;Confirm and Subscribe&quot;</strong> to complete your
						subscription. Thanks for joining us!
					</p>
				</div>
			)}
		</>
	)
}
