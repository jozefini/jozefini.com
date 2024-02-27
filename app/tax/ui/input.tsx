import { cn } from '@/lib/utils'
import { useId } from 'react'

const css = {
  wrapper: 'min-w-0 max-w-full w-full',
  headline: '',
  label: 'text-xs uppercase font-bold text-orange-800 tracking-wider',
  control: 'relative',
  input:
    'inline-flex w-full text-xl items-center h-12 leading-tight pl-9 pr-2 py-2 border-2 rounded-lg bg-white border-orange-900 text-orange-950 font-semibold focus:outline-none disabled:pointer-events-none disabled:select-none disabled:bg-[#fef6f0]',
  symbol:
    'absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl pointer-events-none font-semibold text-orange-800',
}
type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type' | 'id'
> & {
  onChange: (value: number) => void
  symbol?: string
  label: string
}
export const Input = (props: InputProps) => {
  const id = useId()
  const { onChange, className, label, symbol = '€', ...restProps } = props || {}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    props.onChange?.(Number(value || 0))
  }

  return (
    <div className={cn(css.wrapper, className)}>
      <div className={css.headline}>
        <label className={css.label} htmlFor={id}>
          {label}
        </label>
      </div>
      <div className={css.control}>
        <span className={css.symbol}>{symbol}</span>
        <input
          id={id}
          className={css.input}
          type="text"
          onChange={handleChange}
          {...restProps}
        />
      </div>
    </div>
  )
}
