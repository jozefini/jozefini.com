import { Settings } from 'lucide-react'
import { NavItem } from './nav-item'

const css = {
  wrapper: 'mt-auto',
}

export function SideActions() {
  return (
    <div className={css.wrapper}>
      <ul>
        <NavItem href="/ui/dashboard/settings" label="Settings">
          <Settings strokeWidth={1.8} />
        </NavItem>
      </ul>
    </div>
  )
}
