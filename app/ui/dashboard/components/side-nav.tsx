import { NavItem } from './nav-item'
import {
  Calendar,
  Users,
  Map,
  CircleDollarSign,
  GaugeCircle,
} from 'lucide-react'

const css = {
  nav: 'grow',
  list: 'flex flex-col gap-1',
}

export function SideNav() {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <NavItem href="/ui/dashboard" label="Dashboard">
          <GaugeCircle strokeWidth={1.8} />
        </NavItem>
        <NavItem
          href="/ui/dashboard/events"
          label="Events"
          hasNotice
          badge="12"
        >
          <Calendar strokeWidth={1.8} />
        </NavItem>
        <NavItem href="/ui/dashboard/orders" label="Orders">
          <CircleDollarSign strokeWidth={1.8} />
        </NavItem>
        <NavItem href="/ui/dashboard/team" label="Team">
          <Users strokeWidth={1.8} />
        </NavItem>
        <NavItem href="/ui/dashboard/locations" label="Locations">
          <Map strokeWidth={1.8} />
        </NavItem>
      </ul>
    </nav>
  )
}
