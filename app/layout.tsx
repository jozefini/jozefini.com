import '@assets/styles/index.css'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Jozi.me',
	description: 'Portfolio of Jozi.me',
}

type Props = {
	children: React.ReactNode
	metadata: Metadata
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
