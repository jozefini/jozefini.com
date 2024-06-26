import { Actions } from './actions'
import { Pattern } from './pattern'

const styles = {
  wrapper: 'relative mb-8',
  box: 'flex items-center justify-between gap-x-3',
  title:
    'inline-flex items-center font-bold text-[1.5rem] text-slate-950 leading-[1.33]',
}

export function Hero() {
  return (
    <>
      <Pattern />
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h1 className={styles.title}>Event list</h1>
          <Actions />
        </div>
      </div>
    </>
  )
}
