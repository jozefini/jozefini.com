import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { immer } from 'zustand/middleware/immer'
import { AreaOut, RowOut, SeatOut, SectionOut } from '@/seatmap/lib/schema'
import { NestedPartial } from '@/seatmap/lib/types'
import { Snapshot } from '@/seatmap/lib/enums'

type SnapshotData = {
  type: Snapshot
  timestamp: number
  data: string
}
type SeatMapStates = {
  selectedIds: Record<string, number>

  areas: Record<string, AreaOut>
  sections: Record<string, SectionOut>
  rows: Record<string, RowOut>
  seats: Record<string, SeatOut>

  history: SnapshotData[]
  historyIndex: number
}
type SeatMapStore = SeatMapStates
type SeatMapStoreSelector<T> = (state: SeatMapStore) => T
type SeatMapEntity = 'areas' | 'sections' | 'rows' | 'seats'

const initialState: SeatMapStates = {
  selectedIds: {},

  areas: {},
  sections: {},
  rows: {},
  seats: {},

  history: [],
  historyIndex: -1,
} as const

const seatMapStore = createWithEqualityFn(
  immer<SeatMapStore>(set => ({
    ...initialState,

    updateEntity: (
      entity: SeatMapEntity,
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

    redoHistory: () => {
      set(draft => {
        if (draft.historyIndex < draft.history.length - 1) {
          draft.historyIndex++
          const { areas, sections, rows, seats } = JSON.parse(
            draft.history[draft.historyIndex].data
          )
          draft.areas = areas
          draft.sections = sections
          draft.rows = rows
          draft.seats = seats
        }
      })
    },

    undoHistory: () => {
      set(draft => {
        if (draft.historyIndex > 0) {
          draft.historyIndex--
          const { areas, sections, rows, seats } = JSON.parse(
            draft.history[draft.historyIndex].data
          )
          draft.areas = areas
          draft.sections = sections
          draft.rows = rows
          draft.seats = seats
        }
      })
    },

    makeSnapshot: (type: Snapshot) => {
      set(draft => {
        const data = JSON.stringify({
          areas: draft.areas,
          sections: draft.sections,
          rows: draft.rows,
          seats: draft.seats,
        })
        draft.historyIndex++
        draft.history = draft.history.slice(0, draft.historyIndex)
        draft.history.push({
          type,
          timestamp: Date.now(),
          data,
        })
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
