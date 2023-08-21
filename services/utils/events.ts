type EventEl = MediaQueryList | Element
type OnEvent = (el: EventEl, event: string, handler: EventListener) => void
type OffEvent = (el: EventEl, event: string, handler: EventListener) => void

/**
 * Register an event listener on an element
 */
export const on: OnEvent = (el, event, handler) => {
	el?.addEventListener(event, handler)
}

/**
 * Remove an event listener from an element
 */
export const off: OffEvent = (el, event, handler) => {
	el?.removeEventListener(event, handler)
}
