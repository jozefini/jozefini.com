import Image from 'next/image'
import logo from '@/assets/images/mevalim-logo.png'

const styles = {
  wrapper: 'size-16 p-4 flex items-center justify-center',
  img: 'w-full h-full object-contain',
}

export function Logo() {
  return (
    <div className={styles.wrapper}>
      <Image src={logo} alt="Mevalim" className={styles.img} />
    </div>
  )
}
