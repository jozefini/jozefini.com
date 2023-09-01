import { REPLACER_PREFIX, REPLACER_SUFFIX } from '$/lib/constants'

// Replace string with mapped values
export function strReplacer(value: string, mappedReplacer: { [key: string]: string }): string {
	const shortcodes = Object.keys(mappedReplacer)
	if (shortcodes.length && value.includes(REPLACER_PREFIX) && value.includes(REPLACER_SUFFIX)) {
		const pattern = new RegExp(`${REPLACER_PREFIX}(${shortcodes.join('|')})${REPLACER_SUFFIX}`, 'g')

		return value.replace(pattern, (_, key: keyof typeof mappedReplacer) => mappedReplacer[key])
	}
	return value
}
