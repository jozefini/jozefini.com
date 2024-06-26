import { cn } from '@/lib/utils'
import { RotateCcw } from 'lucide-react'
import { Input } from '../input'

const styles = {
  wrapper: 'flex flex-col p-6 pt-8 space-y-4',
  box: 'flex items-center gap-x-3',
  title:
    'inline-flex items-center font-bold text-[1.5rem] text-slate-950 leading-[1.33]',
  icon: 'size-4 text-slate-500 hover:text-slate-950 hover:cursor-pointer',
}

export function Heading({ className }: { className?: string }) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.box}>
        <h1 className={styles.title}>Filters</h1>
        <RotateCcw className={styles.icon} />
      </div>
      <Input placeholder="Title or UUID..." withIcon />
    </div>
  )
}
