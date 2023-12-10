import { ReactNode } from 'react'

const css = {
  wrapper: 'bg-neutral-50 grid grid-cols-[17.5rem_1fr] min-h-screen min-w-full',
  sidebar: 'bg-white relative p-4 flex flex-col gap-14 z-50 shadow-sm',
  main: 'relative px-6 py-4 grow',
  content: 'relative px-6 py-4',
}

export function DashboardWrapper({ children }: { children: ReactNode }) {
  return <div className={css.wrapper}>{children}</div>
}

export function SidebarWrapper({ children }: { children: ReactNode }) {
  return <aside className={css.sidebar}>{children}</aside>
}

export function MainWrapper({ children }: { children: ReactNode }) {
  return <main className={css.main}>{children}</main>
}

export function ContentWrapper({ children }: { children: ReactNode }) {
  return <div className={css.content}>{children}</div>
}
