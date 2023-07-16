/**
 * Helper function to conditionally join classNames together
 */
export function cn(...args: any[]) {
	return args.filter(Boolean).join(' ') || undefined
}
