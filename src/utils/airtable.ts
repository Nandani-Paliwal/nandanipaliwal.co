import Airtable from 'airtable'

let airtableClient: Airtable | null = null

export function getAirtableClient() {
	if (airtableClient) return airtableClient

	airtableClient = new Airtable({
		apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PERSONAL_ACCESS_TOKEN
	})

	return airtableClient
}
