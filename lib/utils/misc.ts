// Join class names and filter out falsy values
export function cn(...args: any[]): string | undefined {
	return args.filter(Boolean).join(' ') || undefined
}
