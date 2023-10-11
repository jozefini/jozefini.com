import type { Metadata } from 'next'
import { getPage } from '@/lib/api'

export async function generateMetadata(): Promise<Metadata> {
	const { title, description } = await getPage({ page: 'home' })
	return {
		title,
		description,
	}
}

export default function Home() {
	return null
}
