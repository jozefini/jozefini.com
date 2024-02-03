import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { immer } from 'zustand/middleware/immer'
import { AreaOut, RowOut, SeatOut, SectionOut } from '@/seatmap/lib/schema'
import { NestedPartial } from '@/seatmap/lib/types'

type SeatMapStates = {
  selectedIds: Record<string, number>

  areas: Record<string, AreaOut>
  sections: Record<string, SectionOut>
  rows: Record<string, RowOut>
  seats: Record<string, SeatOut>
}
type SeatMapStore = SeatMapStates
type SeatMapStoreSelector<T> = (state: SeatMapStore) => T

const initialState: SeatMapStates = {
  selectedIds: {},

  areas: {},
  sections: {},
  rows: {},
  seats: {},
} as const

const seatMapStore = createWithEqualityFn(
  immer<SeatMapStore>((set, get) => ({
    ...initialState,

    updateEntity: (
      entity: 'areas' | 'sections' | 'rows' | 'seats',
      id: string,
      data: NestedPartial<AreaOut | SectionOut | RowOut | SeatOut>
    ) => {
      set(draft => {
        if (draft[entity].hasOwnProperty(id)) {
          draft[entity][id] = {
            ...draft[entity][id],
            ...data,
          } as any
        }
      })
    },

    initStore: (data?: NestedPartial<SeatMapStates>) => {
      set(draft => {
        const keys = Object.keys(initialState) as (keyof SeatMapStates)[]
        for (const key of keys) {
          if (data && data.hasOwnProperty(key)) {
            draft[key] = data[key] as any
          } else {
            draft[key] = initialState[key] as any
          }
        }
      })
    },

    resetStore: (skipStates?: keyof SeatMapStates[]) => {
      set(draft => {
        const keys = Object.keys(initialState) as (keyof SeatMapStates)[]
        const filteredKeys = Array.isArray(skipStates)
          ? keys.filter(key => !skipStates.includes(key))
          : keys
        for (const key of filteredKeys) {
          draft[key] = initialState[key] as any
        }
      })
    },
  })),
  shallow
)

export const getSeatMapStore = <T = SeatMapStore>(
  select?: SeatMapStoreSelector<T>
): T => {
  const states = seatMapStore.getState()
  return typeof select === 'function' ? select(states) : (states as T)
}

export const useSeatMapStore = seatMapStore
