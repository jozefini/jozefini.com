import { useMemo, forwardRef, ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const styles = {
  base: 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  variants: {
    unstyled: '',
    default:
      'rounded bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive:
      'rounded bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    outline:
      'rounded border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    outlinePrimary:
      'rounded border border-primary text-primary bg-background shadow-sm hover:bg-primary/5',
    secondary:
      'rounded bg-secondary text-primary shadow-sm hover:bg-primary/10',
    ghost: 'rounded hover:bg-accent hover:text-accent-foreground',
    filledIndigo:
      'border bg-indigo-600 border-indigo-600 text-white hover:bg-white hover:text-indigo-600',
    outlineIndigo:
      'border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white',
    outlineDestructive:
      'border border-destructive text-destructive hover:bg-destructive hover:text-white',
    link: 'as-link rounded text-primary underline-offset-4 hover:underline',
    destructiveLink:
      'as-link rounded text-destructive underline-offset-4 hover:underline',
    linkText:
      'as-link rounded text-gray-700 underline-offset-4 hover:underline',
    pay: 'rounded bg-primary text-primary-foreground shadow hover:bg-primary/90',
    payGreen: 'rounded bg-teal-600 text-white shadow hover:bg-teal-500',
    outlinePay: 'rounded border border-primary text-primary shadow-sm',
    heroBack:
      'rounded bg-[#fafafa] border border-indigo-600/50 text-indigo-600 hover:bg-white shadow-sm',
  },
  sizes: {
    unstyled: '',
    xsIcon: 'w-6 h-6 rounded-full',
    xsApply: 'text-xs rounded-full h-6 px-3',
    smIcon: 'w-8 h-8 rounded-full',
    sm: 'h-8 rounded-md px-3 text-xs',
    normal: 'h-9 px-4 py-2',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
    canvasIcon: 'h-12 w-12',
  },
}

export type ButtonCustomProps = {
  variant?: keyof typeof styles.variants
  size?: keyof typeof styles.sizes
  asChild?: boolean
  unstyled?: boolean
}
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonCustomProps

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'normal',
      unstyled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const propsWithDefaults = useMemo(() => {
      if (!props.type) {
        return { ...props, type: 'button' as const }
      }
      return props
    }, [props])
    const combinedClassNames = useMemo(() => {
      if (unstyled) {
        return className
      }
      const selectedVariant =
        styles.variants[variant] ?? styles.variants.default
      const selectedSize = styles.sizes[size] ?? styles.sizes.normal

      return cn(styles.base, selectedVariant, selectedSize, className)
    }, [className, variant, size, unstyled])

    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={combinedClassNames} ref={ref} {...propsWithDefaults} />
    )
  }
)
Button.displayName = 'Button'

export { Button, styles as buttonStyles }
