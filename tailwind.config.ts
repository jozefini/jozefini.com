import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-main)'],
			},
			backgroundImage: {
				body: 'radial-gradient(circle at 30% 107%, #fc032c 0%, #7d2155 5%, #4b1030 45%,#300032 60%,#00013a 90%)',
			},
			typography: {
				quoteless: {
					css: {
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' },
					},
				},
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
} satisfies Config
