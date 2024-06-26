import { cn } from '@/lib/utils'
import { Plus, Settings2 } from 'lucide-react'

const styles = {
  wrapper: 'flex items-center gap-x-2',
  btn: 'inline-flex h-11 items-center px-6 gap-x-2 border shadow-[0_2px_0_rgba(0,0,0,0.1)] rounded-[0.5rem] text-sm font-medium transition-all active:scale-[0.98]',
  primaryBtn:
    'border-black/10 bg-slate-900 hover:bg-slate-800 shadow-[inset_0_2px_10px_rgba(255,255,255,0.25),0_2px_0_rgba(0,0,0,0.1)] text-white [&_svg]:text-white/80',
  altBtn:
    'bg-white border-black/10 hover:bg-slate-50 text-slate-900 [&_svg]:text-[#9CA3AF]',
  icon: 'size-5',
}

export function Actions() {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={cn(styles.btn, styles.altBtn)}>
        <Settings2 className={styles.icon} />
        Configure view
      </button>
      <button type="button" className={cn(styles.btn, styles.primaryBtn)}>
        <Plus className={styles.icon} />
        Create event
      </button>
    </div>
  )
}
