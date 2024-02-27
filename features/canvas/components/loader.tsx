import { memo } from 'react'
import { useCanvasStore } from '@/features/canvas/store'

const styles = {
  loader:
    'absolute inset-0 flex items-center justify-center bg-gray-50/90 z-50',
  spinner:
    'animate-spin w-12 h-12 border-2 border-blue-600/20 border-t-blue-700 rounded-full',
}

export const Loader = memo(() => {
  const isLoading = useCanvasStore(s => s.isLoading)
  if (!isLoading) {
    return null
  }

  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  )
})
Loader.displayName = 'Loader'
