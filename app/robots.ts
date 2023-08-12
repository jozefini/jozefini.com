import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
			},
		],
		sitemap: 'https://jozefini.com/sitemap.xml',
		host: 'https://jozefini.com',
	}
}
