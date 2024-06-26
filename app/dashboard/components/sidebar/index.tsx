import { Logo } from './logo'
import { Menu } from './menu'
import { UserActions } from './userActions'

const styles = {
  wrapper: 'w-16 h-full bg-white border-e border-black/10 flex flex-col',
}

export function Sidebar() {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <Menu />
      <UserActions />
    </div>
  )
}
