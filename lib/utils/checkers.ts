type StringOrNumber = string | number

// Check if array has length
export function hasLength(items: any, length = 1, exact = false): boolean {
	return Array.isArray(items) && (exact ? items.length === length : items.length >= length)
}

// Check if array has value
export function hasValue(items: any[], value: any): boolean {
	return hasLength(items) && items.includes(value)
}

// Check if array has values
export function hasValues(items: any[], values: any[]): boolean {
	return hasLength(items) && hasLength(values) && values.every((value) => items.includes(value))
}

// Check if array has any value
export function hasAnyValue(items: any[], values: any[]): boolean {
	return hasLength(items) && hasLength(values) && values.some((value) => items.includes(value))
}

// Check if object has key
export function hasKey(obj: any, key: StringOrNumber): boolean {
	return Object.prototype.hasOwnProperty.call(obj, key)
}

// Check if object has keys
export function hasKeys(obj: any, keys: StringOrNumber[]): boolean {
	return hasLength(keys) && keys.every((key) => hasKey(obj, key))
}

// Check if object has any key
export function hasAnyKey(obj: any, keys: StringOrNumber[]): boolean {
	return hasLength(keys) && keys.some((key) => hasKey(obj, key))
}

// Get value from object by path
export function deepAccess(
	obj: any,
	path: StringOrNumber | StringOrNumber[],
	defaultValue = undefined,
): any {
	const keys = (hasLength(path) ? path : (path as string).split('.')) as StringOrNumber[]
	let result = obj

	for (const key of keys) {
		if (hasKey(result, key)) {
			result = result[key]
		} else {
			return defaultValue
		}
	}

	return result
}
