import { Calendar, ChevronRight, CircleSlash, Ticket } from 'lucide-react'
import { FC } from 'react'

const styles = {
  wrapper: 'mb-6 flex flex-wrap gap-4',
  statBox:
    'w-[17.5rem] p-4 rounded-[0.5rem] border border-black/10 border-b-[3px] bg-white flex flex-col gap-y-6',
  heading: 'flex items-center gap-x-2 justify-between',
  chevron: 'size-4 text-slate-500',
  details: 'flex items-center gap-x-2',
  iconBox:
    'border border-black/10 inline-flex items-center justify-center shrink-0 rounded-[0.5rem] size-7 shadow-[inset_0_2px_10px_rgba(255,255,255,0.25),0_2px_0_rgba(0,0,0,0.1)]',
  icon: 'size-4 text-white',
  title: 'text-slate-600 text-sm',
  value: 'text-[1.5rem] font-semibold text-slate-950',
}

const StatBox = ({
  title,
  value,
  label,
  color,
  icon,
}: {
  title: string
  value: string
  label: string
  color: string
  icon: FC<{ className?: string }>
}) => {
  const IconComp = icon
  return (
    <div className={styles.statBox}>
      <div className={styles.heading}>
        <div className={styles.details}>
          <div className={styles.iconBox} style={{ backgroundColor: color }}>
            <IconComp className={styles.icon} />
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <ChevronRight className={styles.chevron} />
      </div>
      <div className={styles.value}>
        {value} {label}
      </div>
    </div>
  )
}

export function Statistics() {
  return (
    <div className={styles.wrapper}>
      <StatBox
        title="Tickets running out"
        label="Events"
        value="2"
        color="#F09906"
        icon={Ticket}
      />
      <StatBox
        title="Coming soon"
        label="Events"
        value="10"
        color="#065F46"
        icon={Calendar}
      />
      <StatBox
        title="No sales"
        label="Events"
        value="120"
        color="#DD4414"
        icon={CircleSlash}
      />
    </div>
  )
}
