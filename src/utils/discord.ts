import { IS_PRODUCTION } from '~/constant'
import { type DiscordChannelToWebhookMapEnum } from '~/types'

export async function sendAlert(params: {
	title: string
	description: string
	channel: DiscordChannelToWebhookMapEnum
	allowInStaging?: boolean
}) {
	try {
		const { allowInStaging, channel, description, title } = params

		if (!IS_PRODUCTION && !allowInStaging) {
			console.log('Not sending discord alert in non production environment')
			console.log({ ...params })
			return
		}

		console.log('Sending discord alert')
		console.log({ description, title })

		const response = await fetch(channel, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				embeds: [
					{
						title,
						description
					}
				]
			})
		})

		if (!response.ok) {
			throw new Error(`Error from Discord: ${response.status}`)
		}
	} catch (error) {
		console.error(error)
		// ok
	}
}
