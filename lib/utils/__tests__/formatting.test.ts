import { strReplacer } from '../formatting'

describe('strReplacer function', () => {
	test('should replace shortcodes in a string', () => {
		expect(strReplacer('Hello {{name}}', { name: 'world' })).toBe('Hello world')
	})

	test('should replace multiple shortcodes in a string', () => {
		expect(
			strReplacer('Hello {{name}}, my name is {{myName}}', { name: 'world', myName: 'John' }),
		).toBe('Hello world, my name is John')
	})

	test('should ignore shortcodes that are not provided', () => {
		expect(strReplacer('Hello {{name}}', {})).toBe('Hello {{name}}')
	})
})
