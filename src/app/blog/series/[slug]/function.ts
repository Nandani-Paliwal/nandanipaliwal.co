import { notFound } from 'next/navigation'
import { SeriesPageInitialDocument } from 'root/generated/graphql'
import { HASHNODE_PUBLICATION_HOST } from '~/constant'
import { createHeaders, createSSRExchange, getServerSideUrqlClient } from '~/hashnode-api/client'
import { getSeries } from '../../function'

export async function getSeriesBySlug(slug: string) {
	if (!HASHNODE_PUBLICATION_HOST) {
		notFound()
	}
	const ssrCache = createSSRExchange()

	const urqlClient = getServerSideUrqlClient(ssrCache)

	let rawCurrentMenuId = ''
	const [publicationInfo, seriesList] = await Promise.all([
		urqlClient
			.query(
				SeriesPageInitialDocument,
				{
					host: HASHNODE_PUBLICATION_HOST,
					slug: slug,
					first: 6,
					after: null
				},
				{
					fetchOptions: {
						headers: createHeaders({ byPassCache: false })
					},
					requestPolicy: 'network-only'
				}
			)
			.toPromise(),
		getSeries()
	])

	const { publication } = publicationInfo.data || {}

	if (!publication) {
		notFound()
	}

	const { series } = publication || {}

	if (!series) {
		notFound()
	}

	const { posts } = series || {}

	return {
		publication,
		series,
		seriesList: seriesList,
		slug: slug,
		urqlState: ssrCache.extractData(),
		initialLimit: 6,
		posts,
		currentMenuId: rawCurrentMenuId
	}
}
