import { ReactNode } from 'react'
import { Filters } from './components/filters'
import { Sidebar } from './components/sidebar'

const styles = {
  wrapper: 'flex flex-start h-screen',
  main: 'flex-1 h-screen bg-[#F8F8F7] overflow-y-auto p-8 relative',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Filters />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
