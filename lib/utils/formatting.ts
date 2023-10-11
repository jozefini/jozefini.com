import { REPLACER } from '@/lib/constants'

// Replace string with mapped values
export function strReplacer(value: string, mappedReplacer: { [key: string]: string }): string {
	const shortcodes = Object.keys(mappedReplacer)
	if (shortcodes.length && value.includes(REPLACER.prefix) && value.includes(REPLACER.suffix)) {
		const pattern = new RegExp(`${REPLACER.prefix}(${shortcodes.join('|')})${REPLACER.suffix}`, 'g')

		return value.replace(pattern, (_, key: keyof typeof mappedReplacer) => mappedReplacer[key])
	}
	return value
}
