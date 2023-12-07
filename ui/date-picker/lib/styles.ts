export const css = {
  calendar: {
    wrapper: '',
    box: 'flex items-start gap-5 p-4 border rounded-xl shadow-sm',
  },
  header: {
    wrapper: 'flex gap-2 items-center justify-between mb-4',
    action: 'w-7',
    title: 'text-sm font-medium',
    btn: 'inline-flex items-center justify-center whitespace-nowrap rounded-full ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 border border-neutral-300 hover:bg-gradient-to-t hover:from-blue-100 hover:to-blue-50 hover:text-blue-700 hover:border-blue-300 h-7 w-7 bg-transparent p-0',
    arrow: 'h-4 w-4 rtl:-scale-x-100',
  },
  month: {
    wrapper: 'flex flex-col',
    grid: 'grid grid-cols-7 gap-y-0.5 text-center [&>*]:w-8 [&>*]:h-8 [&>*]:text-xs [&>*]:font-medium [&>*]:inline-flex [&>*]:items-center [&>*]:justify-center [&_button]:cursor-pointer',
  },
  item: {
    faded: 'text-gray-300',
    default: 'text-gray-700',
    inRange:
      'range bg-gradient-to-t from-blue-50 to-white text-blue-800 border-y border-blue-200',
    startRange:
      'rounded-l-full [&.range]:border-l rtl:[&.range]:border-r rtl:[&.range]:rounded-r-full rtl:[&.range]:border-l-[0] rtl:rounded-l-[0]',
    endRange:
      'rounded-r-full [&.range]:border-r rtl:[&.range]:border-l rtl:[&.range]:rounded-l-full rtl:[&.range]:border-r-[0] rtl:rounded-r-[0]',
    onlySelected:
      '[&.range]:rounded-full [&.range]:border rtl:[&.range]:border',
    selected: 'bg-gradient-to-t from-blue-500 to-blue-400 text-white',
  },
  day: {
    base: 'relative w-[1.6875rem] h-[1.6875rem] inline-flex items-center rounded-full justify-center ring-offset-white focus-visible:relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2',
    default: 'hover:bg-gradient-to-t hover:from-blue-100 hover:to-blue-50',
    today: 'bg-gradient-to-t from-blue-100 to-blue-50 text-blue-600',
    inRange: 'text-[inherit]',
    selected: 'bg-gradient-to-t from-blue-600 to-blue-500 text-white',
  },
  week: {
    wrapper: 'grid grid-cols-7 text-center [&>*]:w-8 mb-2',
    cell: 'text-xs font-medium text-gray-500 inline-flex items-center justify-center',
  },
}
