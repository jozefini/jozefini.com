// A helper to combine class names conditionally
export const cn = (...args: any[]) => {
  return args.filter(Boolean).join(' ')
}

// A helper to select the first truthy value
export const selectVariant = (...variants: any[]) => {
  for (const variant of variants) {
    if (variant) {
      return variant
    }
  }
  return null
}
