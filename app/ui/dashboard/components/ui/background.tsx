import { CSSProperties } from 'react'

export function GradientBackground() {
  return (
    <div
      className="absolute inset-0 min-w-full min-h-full bg-no-repeat"
      style={
        {
          '--purple-2': 'color(display-p3 0.983 0.971 0.993)',
          '--blue-3': 'color(display-p3 0.912 0.956 0.991)',
          '--sky-3': 'color(display-p3 0.899 0.963 0.989)',
          '--sky-1': 'color(display-p3 0.98 0.995 0.999)',
          '--pink-3': 'color(display-p3 0.981 0.917 0.96)',
          '--pink-1': 'color(display-p3 0.998 0.989 0.996)',
          backgroundImage: `radial-gradient(circle 800px at 700px 200px, var(--purple-2), transparent),
          radial-gradient(circle 600px at calc(100% - 300px) 300px, var(--blue-3), transparent),
          radial-gradient(circle 800px at right center, var(--sky-3), transparent),
          radial-gradient(circle 800px at right bottom, var(--sky-1), transparent),
          radial-gradient(circle 800px at calc(50% - 600px) calc(100% - 100px), var(--pink-3), var(--pink-1), transparent)`,
        } as CSSProperties
      }
    />
  )
}
