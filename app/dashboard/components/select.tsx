import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const styles = {
  select:
    'relative hover:bg-slate-50 flex items-center justify-between px-2 h-[2.375rem] rounded-[0.3125rem] border-black/10 shadow-[0_2px_0_rgba(0,0,0,0.1)] w-full border text-sm transition-all active:scale-[0.99]',
  placeholder: 'text-slate-500',
  value: 'text-slate-900',
  icon: 'size-4 text-slate-500',
}

export function Select({
  placeholder,
  value,
}: {
  placeholder?: string
  value?: string
}) {
  return (
    <button type="button" className={styles.select}>
      {value ? (
        <span className={styles.value}>{value}</span>
      ) : (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
      <ChevronDown className={styles.icon} />
    </button>
  )
}
