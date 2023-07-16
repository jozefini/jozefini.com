import { cn, replacer } from '@utils/helpers'

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

describe('replacer function', () => {
	test('should replace shortcodes in a string', () => {
		expect(replacer('Hello {{name}}', { name: 'world' })).toBe('Hello world')
	})

	test('should replace multiple shortcodes in a string', () => {
		expect(
			replacer('Hello {{name}}, my name is {{myName}}', { name: 'world', myName: 'John' }),
		).toBe('Hello world, my name is John')
	})

	test('should ignore shortcodes that are not provided', () => {
		expect(replacer('Hello {{name}}', {})).toBe('Hello {{name}}')
	})
})
