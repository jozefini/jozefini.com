import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'

// Types

export type CanvasStoreStates = {
  isLoading: boolean
  selected: string[]

  scale: number
  scaleToFit: number

  width: number
  height: number
  touchCount: number

  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  edges: {
    top: number
    bottom: number
    left: number
    right: number
  }
  stageSize: {
    width: number
    height: number
  }
}
export type CanvasStoreActions = {
  setState: (data: Partial<CanvasStoreStates>) => void
  initStore: (data?: Partial<CanvasStoreStates>) => void
  resetStore: (skipStates?: (keyof CanvasStoreStates)[]) => void
}
export type CanvasStore = CanvasStoreStates & CanvasStoreActions

// Store

const initialState: CanvasStoreStates = {
  isLoading: false,
  selected: [],

  scale: 1,
  scaleToFit: 1,
  touchCount: 0,

  width: 0,
  height: 0,

  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: 1000,
    height: 1000,
  },
  edges: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  stageSize: {
    width: 1000,
    height: 1000,
  },
}
const canvasStore = createWithEqualityFn(
  immer<CanvasStore>(set => ({
    ...initialState,
    setState: data => {
      const keys = Object.keys(initialState) as (keyof CanvasStoreStates)[]
      const newData = keys.reduce((acc: any, key) => {
        if (data[key] !== undefined) {
          acc[key] = data[key]
        }
        return acc
      }, {} as Partial<CanvasStoreStates>)

      set(newData)
    },
    initStore: data => {
      set((draft: any) => {
        const keys = Object.keys(initialState) as (keyof CanvasStoreStates)[]
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
        const keys = Object.keys(initialState) as (keyof CanvasStoreStates)[]
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

export const getCanvasStore = canvasStore.getState
export const useCanvasStore = canvasStore

// Devtools

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('CanvasStore', canvasStore)
}
