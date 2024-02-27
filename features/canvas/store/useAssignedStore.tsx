import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'

// Types

export type AssignedStoreStates = {
  selected: string[]
  mapId: number
  previewId: string
  previewX: number
  previewY: number
  hoveredId: string
  hoveredX: number
  hoveredY: number
  colors: Record<string, string>
  assigned: Record<string, string>
  reserved: string[]
}
export type AssignedStoreActions = {
  closePopOver: () => void
  setState: (data: Partial<AssignedStoreStates>) => void
  initStore: (data?: Partial<AssignedStoreStates>) => void
  resetStore: (skipStates?: (keyof AssignedStoreStates)[]) => void
}
export type AssignedStore = AssignedStoreStates & AssignedStoreActions

// Store

const initialState: AssignedStoreStates = {
  selected: [],
  mapId: 0,
  previewId: '',
  previewX: 0,
  previewY: 0,
  hoveredId: '',
  hoveredX: 0,
  hoveredY: 0,
  colors: {},
  assigned: {},
  reserved: [],
}
const assignedStore = createWithEqualityFn(
  immer<AssignedStore>(set => ({
    ...initialState,
    closePopOver: () => {
      set({
        previewId: '',
        hoveredId: '',
        previewX: 0,
        previewY: 0,
        hoveredX: 0,
        hoveredY: 0,
      })
    },
    setState: data => {
      const keys = Object.keys(initialState) as (keyof AssignedStoreStates)[]
      const newData = keys.reduce((acc: any, key) => {
        if (data[key] !== undefined) {
          acc[key] = data[key]
        }
        return acc
      }, {} as Partial<AssignedStoreStates>)

      set(newData)
    },
    initStore: data => {
      set((draft: any) => {
        const keys = Object.keys(initialState) as (keyof AssignedStoreStates)[]
        for (const key of keys) {
          if (data && data.hasOwnProperty(key)) {
            draft[key] = data[key]
          } else {
            draft[key] = initialState[key]
          }
        }
      })
    },
    resetStore: skipStates => {
      set((draft: any) => {
        const keys = Object.keys(initialState) as (keyof AssignedStoreStates)[]
        const filteredKeys = Array.isArray(skipStates)
          ? keys.filter(key => !skipStates.includes(key))
          : keys
        for (const key of filteredKeys) {
          draft[key] = initialState[key]
        }
      })
    },
  })),
  shallow
)

// Usage

export const getAssignedStore = assignedStore.getState
export const useAssignedStore = assignedStore

// Devtools

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('AssignedStore', assignedStore)
}
