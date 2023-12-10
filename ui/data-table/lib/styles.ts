export const css = {
  body: {
    wrapper: '[&_tr:last-child]:border-0',
    row: 'border-b transition-colors hover:bg-gray-50 data-[state=selected]:gray-50',
    cell: 'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  },
}
