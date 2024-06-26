import { cn } from '@/lib/utils'
import { useState } from 'react'

const styles = {
  wrapper: 'flex flex-wrap gap-2',
  checkbox:
    'h-8 px-3.5 rounded-full border shadow-[0_2px_0_rgba(0,0,0,0.1)] transition-all active:scale-[0.96]',
  activeCheckbox:
    'border-black/10 bg-slate-900 hover:bg-slate-800 shadow-[inset_0_2px_10px_rgba(255,255,255,0.25),0_2px_0_rgba(0,0,0,0.1)]',
  defaultCheckbox: 'bg-white border-black/10 hover:bg-slate-50',
  dot: 'size-2 rounded-full me-1.5 inline-flex',
  label: 'text-sm font-medium transition-colors',
  activeLabel: 'text-white',
  defaultLabel: 'text-gray-700',
  counter: 'text-sm ms-2.5 transition-colors',
  activeCounter: 'text-white/80',
  defaultCounter: 'text-[#204C43]/80',
}

type CheckboxProps = {
  label: string
  value: string
  counter?: number
  color?: string
  checked: string[]
  setChecked: (prev: string[]) => void
}
type Option = Omit<CheckboxProps, 'setChecked' | 'checked'>
type CheckboxesProps = {
  options: Option[]
  selected: string[]
}

const Checkbox = ({
  label,
  value,
  color,
  counter,
  checked,
  setChecked,
}: CheckboxProps) => {
  const isActive = checked.includes(value)
  const handleClick = () => {
    let newChecked: string[] = checked.filter(v => v !== value)
    setChecked(isActive ? newChecked : [...newChecked, value])
  }
  return (
    <button
      type="button"
      className={cn(
        styles.checkbox,
        isActive ? styles.activeCheckbox : styles.defaultCheckbox
      )}
      onClick={handleClick}
    >
      {!!color && (
        <span className={styles.dot} style={{ backgroundColor: color }} />
      )}
      <span
        className={cn(
          styles.label,
          isActive ? styles.activeLabel : styles.defaultLabel
        )}
      >
        {label}
      </span>
      {!!counter && (
        <span
          className={cn(
            styles.counter,
            isActive ? styles.activeCounter : styles.defaultCounter
          )}
        >
          {counter}
        </span>
      )}
    </button>
  )
}

export function Checkboxes({ options, selected }: CheckboxesProps) {
  const [checked, setChecked] = useState<string[]>(selected || [])

  return (
    <div className={styles.wrapper}>
      {options.map(option => (
        <Checkbox
          key={option.label}
          setChecked={setChecked}
          checked={checked}
          {...option}
        />
      ))}
    </div>
  )
}
