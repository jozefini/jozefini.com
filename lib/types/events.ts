type EventEl = MediaQueryList | Element

export type ElementEvent = (el: EventEl, event: string, handler: EventListener) => void
