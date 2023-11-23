import { ReactNode } from 'react'
import { SideBrand } from './components/side-brand'
import { SideNav } from './components/side-nav'
import { SideActions } from './components/side-actions'

const css = {
  wrapper: 'bg-dash-side grid grid-cols-[17.5rem_1fr] min-h-screen min-w-full',
  sidebar: 'p-4 flex flex-col gap-14 border-r',
  main: 'bg-white',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>
        <SideBrand />
        <SideNav />
        <SideActions />
      </aside>

      <main className={css.main}>{children}</main>
    </div>
  )
}
