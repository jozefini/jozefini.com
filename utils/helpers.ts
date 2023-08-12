// Join class names and filter out falsy values
export function cn(...args: any[]): string | undefined {
	return args.filter(Boolean).join(' ') || undefined
}

// Replace string with mapped values
export function strReplacer(value: string, mappedReplacer: { [key: string]: string }): string {
	const prefix = '{{'
	const suffix = '}}'
	const shortcodes = Object.keys(mappedReplacer)
	if (shortcodes.length && value.includes(prefix) && value.includes(suffix)) {
		const pattern = new RegExp(`${prefix}(${shortcodes.join('|')})${suffix}`, 'g')

		return value.replace(pattern, (_, key: keyof typeof mappedReplacer) => mappedReplacer[key])
	}
	return value
}
