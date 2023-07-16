import { cn } from '@utils/helpers'

describe('cn function', () => {
	test('should concatenate strings with spaces', () => {
		expect(cn('hello', 'world')).toBe('hello world')
	})

	test('should ignore falsy values', () => {
		expect(cn('hello', '', 'world', null, undefined)).toBe('hello world')
	})

	test('should return undefined if no valid arguments are provided', () => {
		expect(cn()).toBeUndefined()
	})
})
