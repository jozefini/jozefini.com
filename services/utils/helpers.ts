const REPLACER_PREFIX = '{{'
const REPLACER_SUFFIX = '}}'

// Join class names and filter out falsy values
export function cn(...args: any[]): string | undefined {
	return args.filter(Boolean).join(' ') || undefined
}

// Replace string with mapped values
export function strReplacer(value: string, mappedReplacer: { [key: string]: string }): string {
	const shortcodes = Object.keys(mappedReplacer)
	if (shortcodes.length && value.includes(REPLACER_PREFIX) && value.includes(REPLACER_SUFFIX)) {
		const pattern = new RegExp(`${REPLACER_PREFIX}(${shortcodes.join('|')})${REPLACER_SUFFIX}`, 'g')

		return value.replace(pattern, (_, key: keyof typeof mappedReplacer) => mappedReplacer[key])
	}
	return value
}
