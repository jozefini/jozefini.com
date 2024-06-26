const styles = {
  wrapper:
    'relative rounded-[0.5rem] h-full bg-white border border-black/10 border-b-[3px]',
  heading: 'h-[2.375rem] border-b border-black/10 rounded-t-[inherit]',
}

export function DataTable() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading} />
    </div>
  )
}
