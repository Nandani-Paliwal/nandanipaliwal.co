import { createHeaders, createSSRExchange, getServerSideUrqlClient } from '~/hashnode-api/client'
import {
	HomePageInitialDocument,
	type HomePageInitialQueryVariables,
	HomePagePostsDocument,
	type HomePagePostsQueryVariables,
	PublicationLayout,
	type SeriesListQueryVariables,
	SeriesListDocument
} from 'root/generated/graphql'
import { HASHNODE_PUBLICATION_HOST } from '~/constant'

export async function getBlogHomePageData() {
	const ssrExchange = createSSRExchange()

	if (!ssrExchange) {
		throw new Error('SSR exchange not found!!!')
	}

	const urqlClient = getServerSideUrqlClient(ssrExchange)

	if (!HASHNODE_PUBLICATION_HOST) {
		throw new Error('NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST is undefined!!!')
	}

	const homePageInitialQueryVariables: HomePageInitialQueryVariables = {
		host: HASHNODE_PUBLICATION_HOST
	}

	const [publicationInfo, series] = await Promise.all([
		urqlClient
			.query(HomePageInitialDocument, homePageInitialQueryVariables, {
				fetchOptions: {
					headers: createHeaders({ byPassCache: true })
				},
				requestPolicy: 'network-only'
			})
			.toPromise(),
		getSeries()
	])

	if (publicationInfo.error) {
		console.error('Error while fetching publication info', {
			variables: homePageInitialQueryVariables,
			error: publicationInfo.error
		})
		throw publicationInfo.error
	}

	if (!publicationInfo.data?.publication) {
		return null
	}

	const { publication } = publicationInfo.data

	const subtractValue = publication.pinnedPost ? 1 : 0
	const initialLimit =
		publication.preferences.layout === PublicationLayout.Magazine
			? 12 - subtractValue
			: 6 - subtractValue

	const homePagePostsVariables: HomePagePostsQueryVariables = {
		host: HASHNODE_PUBLICATION_HOST,
		first: initialLimit,
		filter: { excludePinnedPost: !!publication.pinnedPost }
	}
	const homePagePostsResponse = await urqlClient
		.query(HomePagePostsDocument, homePagePostsVariables, {
			fetchOptions: {
				headers: createHeaders({ byPassCache: false })
			},
			requestPolicy: 'network-only'
		})
		.toPromise()
	if (homePagePostsResponse.error) {
		console.error('Error while fetching home page posts', {
			error: homePagePostsResponse.error,
			variables: homePagePostsVariables
		})
		throw homePagePostsResponse.error
	}

	if (!homePagePostsResponse.data?.publication) {
		console.error('Publication not found fetching home page posts; returning 404', {
			variables: homePagePostsVariables
		})
		return null
	}

	return {
		publication,
		initialLimit,
		series: series,
		urqlState: ssrExchange.extractData(),
		host: HASHNODE_PUBLICATION_HOST,
		isHome: true
	}
}

export async function getSeries() {
	const ssrExchange = createSSRExchange()

	if (!ssrExchange) {
		throw new Error('SSR exchange not found!!!')
	}

	const urqlClient = getServerSideUrqlClient(ssrExchange)

	if (!HASHNODE_PUBLICATION_HOST) {
		throw new Error('NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST is undefined!!!')
	}

	const seriesListQueryVariables: SeriesListQueryVariables = {
		host: HASHNODE_PUBLICATION_HOST
	}
	const seriesListInfo = await urqlClient
		.query(SeriesListDocument, seriesListQueryVariables, {
			fetchOptions: {
				headers: createHeaders({ byPassCache: true })
			},
			requestPolicy: 'network-only'
		})
		.toPromise()

	if (seriesListInfo.error) {
		console.error('Error while fetching publication info', {
			variables: seriesListQueryVariables,
			error: seriesListInfo.error
		})
		throw seriesListInfo.error
	}

	if (!seriesListInfo.data?.publication) {
		return []
	}

	const { publication } = seriesListInfo.data

	return publication.seriesList.edges.map(node => ({ ...node.node }))
}
