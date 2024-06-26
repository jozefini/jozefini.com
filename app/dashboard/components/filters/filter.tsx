import { cn } from '@/lib/utils'
import { RotateCcw } from 'lucide-react'
import { ReactNode } from 'react'

const styles = {
  wrapper: 'flex flex-col',
  extendedWrapper: 'space-y-4',
  defaultWrapper: 'space-y-2',
  heading: 'flex items-center justify-between gap-x-2',
  label: 'text-base font-semibold text-[#374151]',
  reset: 'active:scale-95 transition-all',
  resetIcon: 'size-4 text-slate-400 hover:text-slate-950',
}

export function Filter({
  children,
  label,
  onReset,
}: {
  children?: ReactNode
  label?: string
  onReset?: () => void
}) {
  const hasReset = Boolean(onReset)
  return (
    <div
      className={cn(
        styles.wrapper,
        hasReset ? styles.extendedWrapper : styles.defaultWrapper
      )}
    >
      <div className={styles.heading}>
        <h2 className={styles.label}>{label}</h2>
        {hasReset && (
          <button type="button" className={styles.reset} onClick={onReset}>
            <RotateCcw className={styles.resetIcon} />
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}
