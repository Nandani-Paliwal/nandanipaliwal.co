import { notFound } from 'next/navigation'
import BlogClientPage from './client-page'
import { getBlogHomePageData } from './function'

export const revalidate = 60 * 60 * 24 * 30

const Blog = async () => {
	const blogHomeData = await getBlogHomePageData()

	if (!blogHomeData) {
		return notFound()
	}

	return (
		<BlogClientPage
			pageProps={null}
			host={blogHomeData.host}
			isHome={blogHomeData.isHome}
			publication={blogHomeData.publication}
			urqlState={blogHomeData.urqlState}
			initialLimit={blogHomeData.initialLimit}
			series={blogHomeData.series}
		/>
	)
}

export default Blog
