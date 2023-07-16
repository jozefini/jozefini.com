/**
 * Helper function to conditionally join classNames together
 */
export function cn(...args: any[]): string | undefined {
	return args.filter(Boolean).join(' ') || undefined
}

/**
 * Helper function to replace shortcodes in a string
 */
export function replacer(value: string, replacer: { [key: string]: string }): string {
	const prefix = '{{'
	const suffix = '}}'
	const shortcodes = Object.keys(replacer)
	if (shortcodes.length) {
		const pattern = new RegExp(`${prefix}(${shortcodes.join('|')})${suffix}`, 'g')

		return value.replace(pattern, (_, key: keyof typeof replacer) => replacer[key])
	}
	return value
}
