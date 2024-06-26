import Image from 'next/image'
import pattern from '@/assets/images/pattern.png'

const styles = {
  wrapper:
    'absolute top-0 right-0 rtl:left-0 rtl:right-auto select-none pointer-events-none',
  img: 'object-contain w-full h-full',
}

export function Pattern() {
  return (
    <div className={styles.wrapper}>
      <Image src={pattern} alt="" className={styles.img} />
    </div>
  )
}
