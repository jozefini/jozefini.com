import logo from '@/assets/images/dashboard-logo.png'
import Image from 'next/image'

const css = {
  brand: 'flex items-center gap-x-4',
  figure: '',
  logo: 'w-12 h-12',
  identity: 'flex flex-col gap-y-1',
  name: 'text-xl font-semibold leading-none text-primary',
  description: 'text-xs inline-flex text-gray-500 leading-none',
}

export function SideBrand() {
  return (
    <div className={css.brand}>
      <figure className={css.figure}>
        <Image src={logo} alt="logo" className={css.logo} />
      </figure>
      <div className={css.identity}>
        <div className={css.name}>Company</div>
        <span className={css.description}>Tickets System</span>
      </div>
    </div>
  )
}
