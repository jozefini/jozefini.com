import { MoreVertical, User } from 'lucide-react'
// import userAvatar from '@/assets/images/user-avatar.jpg'
// import Image from 'next/image'

const css = {
  btn: 'rounded-lg inline-flex w-full h-12 gap-2 p-1.5 items-center justify-between shadow-sm border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 group',
  content: 'grow flex items-center truncate text-start',
  name: 'block leading-tight text-xs font-semibold text-black leading-0 truncate',
  email: 'block leading-tight text-xs text-neutral-500 truncate',
  avatar:
    'relative w-8 h-8 bg-neutral-200 rounded-md flex items-center justify-center',
  image: 'rounded-[inherit] absolute inset-0 w-full h-full object-cover',
  icon: 'w-4 h-4',
  moreIcon:
    'shrink-0 w-4 h-4 -mr-1 text-neutral-400 group-hover:text-neutral-600',
}

export function LoggedUser() {
  return (
    <div>
      <button type="button" className={css.btn}>
        <span className={css.avatar}>
          <User className={css.icon} />
          {/* <Image src={userAvatar} alt="avatar" className={css.image} /> */}
        </span>
        <span className={css.content}>
          <span>
            <span className={css.name}>Administrator</span>
            <span className={css.email}>admin@gmail.com</span>
          </span>
        </span>
        <MoreVertical className={css.moreIcon} />
      </button>
    </div>
  )
}
