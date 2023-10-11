import '@/assets/styles/index.css'

// import { Footer } from '@/components/footer'
// import { Header } from '@/components/header'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { getPage } from '@/lib/api'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				{/* <Header /> */}
				{children}
				{/* <Footer /> */}
			</body>
		</html>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	const { title, description } = await getPage({ page: 'home' })
	return {
		title,
		description,
	}
}
