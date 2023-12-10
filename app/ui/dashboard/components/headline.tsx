const css = {
  headline: 'flex items-center gap-4',
  title: 'inline-flex text-3xl font-semibold leading-none text-black',
  actions: 'flex items-center gap-x-4',
  button:
    'px-4 py-1 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600',
}

export function Headline() {
  return (
    <div className={css.headline}>
      <h1 className={css.title}>Dashboard</h1>

      <div className={css.actions}>
        <button className={css.button}>Create</button>
      </div>
    </div>
  )
}
