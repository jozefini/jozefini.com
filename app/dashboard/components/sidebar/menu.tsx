'use client'

import { cn } from '@/lib/utils'
import {
  Banknote,
  BarChartBig,
  LifeBuoy,
  MapPin,
  ShoppingCart,
  Star,
  Users,
} from 'lucide-react'
import { FC, createContext, useContext, useMemo, useState } from 'react'

const styles = {
  wrapper: 'flex flex-col space-y-1 items-center grow',
  item: 'size-10 inline-flex items-center justify-center rounded-[0.5rem] transition-all active:scale-[0.93]',
  defaultItem: 'text-[#7E8583] hover:text-[#253330]',
  activeItem:
    'bg-[#F9F7F1] ring-1 ring-inset ring-black/5 text-[#253330] shadow-lg shadow-[#f7f5f0]',
  icon: 'size-5',
}

type MenuItemProps = {
  title: string
  icon: FC<{ className?: string }>
  iconActive?: FC<{ className?: string }>
}

const ActiveContext = createContext({
  active: '',
  setActive: (active: string) => {},
})

const MenuItem = ({ title, icon, iconActive }: MenuItemProps) => {
  const { active, setActive } = useContext(ActiveContext)
  const isActive = active === title

  const { IconComp, itemClasses } = useMemo(() => {
    const itemClasses = cn(
      styles.item,
      isActive ? styles.activeItem : styles.defaultItem
    )
    const IconComp = isActive ? iconActive || icon : icon

    return { itemClasses, IconComp }
  }, [isActive, icon, iconActive])

  return (
    <button
      type="button"
      className={itemClasses}
      title={title}
      onClick={() => {
        setActive(title)
      }}
    >
      <IconComp className={styles.icon} />
    </button>
  )
}

export function Menu() {
  const [active, setActive] = useState('Events')
  return (
    <ActiveContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      <div className={styles.wrapper}>
        <MenuItem title="Events" icon={Star} />
        <MenuItem title="Orders" icon={ShoppingCart} />
        <MenuItem title="Users" icon={Users} />
        <MenuItem title="Locations" icon={MapPin} />
        <MenuItem title="Reports" icon={BarChartBig} />
        <MenuItem title="Payments" icon={Banknote} />
        <MenuItem title="Support" icon={LifeBuoy} />
      </div>
    </ActiveContext.Provider>
  )
}
