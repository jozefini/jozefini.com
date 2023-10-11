import { Metadata } from 'next'
import { getPage } from '@/lib/api'

import { Form } from '@/app/auth/sign-in/components'

export default function SignInPage() {
	return <Form />
}

export async function generateMetadata(): Promise<Metadata> {
	const { title, description } = await getPage({ page: 'home' })
	return {
		title,
		description,
	}
}
