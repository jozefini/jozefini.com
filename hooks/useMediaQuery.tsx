import { useEffect, useState } from 'react'

const defaultBreakpoint = 992

type MediaQuery = {
  isMobile: boolean
  isDesktop: boolean
  value: any
}

type MediaQueryProps = {
  mobileValue?: any
  desktopValue?: any
  breakpoint?: number
}

export const getMediaQuery = (props: MediaQueryProps = {}): MediaQuery => {
  const { mobileValue, desktopValue, breakpoint } = props || {}
  const breakpointValue = Number(breakpoint ?? defaultBreakpoint)
  const desktop = window.matchMedia(`(min-width: ${breakpointValue}px)`)

  const isMobile = !desktop.matches
  const isDesktop = desktop.matches
  const value = isMobile ? mobileValue : desktopValue

  return {
    isMobile,
    isDesktop,
    value,
  }
}

export function useMediaQuery(props: MediaQueryProps = {}): MediaQuery {
  const { mobileValue, desktopValue, breakpoint } = props || {}
  const [mediaQuery, setMediaQuery] = useState<MediaQuery>({
    isMobile: false,
    isDesktop: false,
    value: null,
  })

  useEffect(() => {
    const breakpointValue = Number(breakpoint ?? defaultBreakpoint)
    const desktop = window.matchMedia(`(min-width: ${breakpointValue}px)`)

    const watchForChanges = () => {
      const isMobile = !desktop.matches
      const isDesktop = desktop.matches
      const value = isMobile ? mobileValue : desktopValue

      setMediaQuery({
        isMobile,
        isDesktop,
        value,
      })
    }

    watchForChanges()

    desktop.addEventListener('change', watchForChanges)
    return () => {
      desktop.removeEventListener('change', watchForChanges)
    }
  }, [desktopValue, mobileValue, breakpoint])

  return mediaQuery
}
