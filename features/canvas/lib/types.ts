import * as v from 'valibot'
import {
  AreaSchema,
  RowSchema,
  SectionSchema,
  SeatSchema,
  SectionStoreSchema,
  RowStoreSchema,
  SeatStoreSchema,
} from '@/features/canvas/lib/schemas'

// Inferred

export type RestArea = v.Input<typeof AreaSchema>
export type StoreArea = v.Output<typeof AreaSchema>

export type RestSection = v.Input<typeof SectionSchema>
export type StoreSection = v.Output<typeof SectionStoreSchema>

export type RestRow = v.Input<typeof RowSchema>
export type StoreRow = v.Output<typeof RowStoreSchema>

export type RestSeat = v.Input<typeof SeatSchema>
export type StoreSeat = v.Output<typeof SeatStoreSchema>
