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
type Store = State & Actions

const initialState: State = {
	count: 0,
}

const appStore = create(
	immer<Store>((set) => ({
		...initialState,
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
export const useAppStore = (select: (state: Store) => any) => appStore(select, shallow)
