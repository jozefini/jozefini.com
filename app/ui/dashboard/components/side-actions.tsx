import { Settings } from 'lucide-react'
import { NavItem } from './nav-item'
import { LoggedUser } from './logged-user'

const css = {
  wrapper: 'mt-auto flex flex-col gap-4',
}

export function SideActions() {
  return (
    <div className={css.wrapper}>
      <ul>
        <NavItem href="/ui/dashboard/settings" label="Settings">
          <Settings strokeWidth={1.8} />
        </NavItem>
      </ul>

      <LoggedUser />
    </div>
  )
}
