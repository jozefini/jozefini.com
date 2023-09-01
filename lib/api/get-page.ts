const getHome = async (): Promise<{ title: string; description: string }> =>
	new Promise((resolve) =>
		resolve({
			title: 'Home - Jozefin B.',
			description: 'Portfolio of Jozefin B.',
		}),
	)

const getAbout = async (): Promise<{ title: string; description: string }> =>
	new Promise((resolve) =>
		resolve({
			title: 'About - Jozefin B.',
			description: 'About Jozefin B.',
		}),
	)

const get404 = async (): Promise<{ title: string; description: string }> =>
	new Promise((resolve) =>
		resolve({
			title: 'Not found - Jozefin B.',
			description: 'Page not found',
		}),
	)

type Page = 'home' | 'about'

export async function getPage(options?: { page: Page }) {
	const { page } = options || {}
	switch (page) {
		case 'home':
			return await getHome()
		case 'about':
			return await getAbout()
		default:
			return await get404()
	}
}
