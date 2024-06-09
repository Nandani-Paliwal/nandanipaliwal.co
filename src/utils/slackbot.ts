import { IS_PRODUCTION } from '~/constant'

const channels = [
	'#error-notifications',
	'#lead-notification',
	'#email-unsubscription-notifications',
	'#newsletter-subscription-notifications'
] as const

const channelWebhookUrls: {
	[key in (typeof channels)[number]]: string
} = {
	'#lead-notification':
		'https://hooks.slack.com/services/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',
	'#error-notifications':
		'https://hooks.slack.com/services/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',
	'#email-unsubscription-notifications':
		'https://hooks.slack.com/services/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',
	'#newsletter-subscription-notifications':
		'https://hooks.slack.com/services/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'
}

type NotifySlackArgs = {
	message: string
	title: string
	channel: (typeof channels)[number]
	allowStaging?: true
}

async function notify({ title, message, channel, allowStaging }: NotifySlackArgs) {
	try {
		console.log(`Sending slack alert for ${title}`)

		if (IS_PRODUCTION || allowStaging) {
			const res = await fetch(channelWebhookUrls[channel], {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					channel,
					text: `*${title}*\n\n${message}`
				})
			})
			if (res.status >= 400) {
				console.error('Slack request failed', await res.text())
				throw new Error('Something went wrong with slack-bot')
			}
		} else {
			console.log(`*${title}*\n\n${message}`)
		}
	} catch (error) {
		console.error(error)
		console.error('Something went wrong posting to slack')
	}
}

export { notify }
