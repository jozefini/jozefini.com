// Types.
type Path<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ?
            | `${Prefix}${Prefix extends '' ? '' : '.'}${K}`
            | Path<T[K], `${Prefix}${Prefix extends '' ? '' : '.'}${K}`>
        : never
    }[keyof T]
  : ''

type DeepAccessHelper<
  T,
  Path extends string,
> = Path extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? DeepAccessHelper<T[First], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never

type DeepAccess<T, P extends Path<T>> = DeepAccessHelper<T, P>

// A helper to combine class names conditionally
export const cn = (...args: any[]) => {
  return args.filter(Boolean).join(' ')
}

// A helper to select the first truthy value
export const firstTruthy = (...variants: any[]) => {
  for (const variant of variants) {
    if (variant) {
      return variant
    }
  }
  return null
}

export const deepAccess = <T, P extends Path<T>, D = undefined>(
  obj: T,
  path: P,
  defaultValue?: D
): DeepAccess<T, P> | (D extends undefined ? undefined : D) => {
  const parts = (path as string).split('.') as Array<keyof T>
  let result: any = obj

  for (const part of parts) {
    if (result === undefined || result === null || !(part in result)) {
      return defaultValue as
        | DeepAccess<T, P>
        | (D extends undefined ? undefined : D)
    }
    result = result[part]
  }

  return result === undefined
    ? (defaultValue as DeepAccess<T, P> | (D extends undefined ? undefined : D))
    : result
}
