import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

const styles = {
  wrapper: 'relative w-full',
  input:
    'flex items-center h-[2.375rem] px-2 rounded-[0.3125rem] border-black/10 shadow-[0_2px_0_rgba(0,0,0,0.1)] w-full border text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:bg-slate-50 transition-colors',
  inputWithIcon: 'ps-8',
  icon: 'size-4 -mt-2 -translate-y-px text-slate-500 pointer-events-none absolute left-2 top-1/2 rtl:left-auto rtl:right-2',
}

export function Input({
  placeholder,
  value,
  withIcon,
}: {
  placeholder?: string
  value?: string
  withIcon?: boolean
}) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={cn(styles.input, withIcon && styles.inputWithIcon)}
      />
      {withIcon && <Search className={styles.icon} />}
    </div>
  )
}
