import '$/assets/styles/index.css'

// import { Footer } from '$/components/footer'
// import { Header } from '$/components/header'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Jozefin B.',
	description: 'Portfolio of Jozefin B.',
}

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
