import { cn } from '@/lib/utils'
import { Clock, User } from 'lucide-react'
import { FC, useMemo } from 'react'

const styles = {
  wrapper: 'mt-auto pt-4 pb-2 flex flex-col items-center',
  item: 'size-10 inline-flex items-center justify-center rounded-[0.5rem] transition-all active:scale-[0.93]',
  defaultItem: 'text-[#7E8583] hover:text-[#253330]',
  activeItem: 'bg-[#F7F7F7] text-[#7E8583] hover:text-[#253330]',
  icon: 'size-5',
}

type LinkItemProps = {
  title: string
  icon: FC<{ className?: string }>
  iconActive?: FC<{ className?: string }>
  isActive?: boolean
}

const LinkItem = ({ title, icon, iconActive, isActive }: LinkItemProps) => {
  const { IconComp, itemClasses } = useMemo(() => {
    const itemClasses = cn(
      styles.item,
      isActive ? styles.activeItem : styles.defaultItem
    )
    const IconComp = isActive ? iconActive || icon : icon

    return { itemClasses, IconComp }
  }, [isActive, icon, iconActive])

  return (
    <button type="button" className={itemClasses} title={title}>
      <IconComp className={styles.icon} />
    </button>
  )
}

export function UserActions() {
  return (
    <div className={styles.wrapper}>
      <LinkItem title="Date" icon={Clock} />
      <LinkItem title="Profie" icon={User} isActive />
    </div>
  )
}
