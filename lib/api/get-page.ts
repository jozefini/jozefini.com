const getHome = async () =>
	new Promise((resolve) =>
		resolve({
			title: 'Home',
		}),
	)

const getAbout = async () =>
	new Promise((resolve) =>
		resolve({
			title: 'About',
		}),
	)

const get404 = async () =>
	new Promise((resolve) =>
		resolve({
			title: '404',
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
