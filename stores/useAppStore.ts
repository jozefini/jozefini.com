import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

type State = {
	count: number
}

type Actions = {
	increment: (qty: number) => void
	decrement: (qty: number) => void
}

const appStore = create(
	immer<State & Actions>((set) => ({
		count: 0,
		increment: (qty: number) =>
			set((state) => {
				state.count += qty
			}),
		decrement: (qty: number) =>
			set((state) => {
				state.count -= qty
			}),
	})),
)

// Unsubscribed state
export const getAppStore = appStore.getState
// Subscribed state
export const useAppStore = (select: any) => appStore(select, shallow)
