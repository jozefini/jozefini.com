import { ElementEvent } from '@/lib/types'

// Register an event listener on an element
export const on: ElementEvent = (el, event, handler) => {
	el?.addEventListener(event, handler)
}

// Remove an event listener from an element
export const off: ElementEvent = (el, event, handler) => {
	el?.removeEventListener(event, handler)
}
