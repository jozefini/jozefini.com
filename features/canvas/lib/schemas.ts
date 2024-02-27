import * as v from 'valibot'
import { RowLabelAt } from '@/features/canvas/lib/enums'

// Area
export const AreaSchema = v.object({
  id: v.string(),
  name: v.string(),
  sectionIds: v.array(v.string()),
})

// Section
export const SectionSchema = v.object({
  id: v.string(),
  rowIds: v.array(v.string()),
  startingRow: v.number(),
  startingSeat: v.number(),
  maxRows: v.number(),
  x: v.number(),
  y: v.number(),
  maxRowSeats: v.number(),
  rowLabels: v.optional(v.enum_(RowLabelAt), RowLabelAt.Both),
  reverseX: v.optional(v.boolean(), false),
  reverseY: v.optional(v.boolean(), false),
  rotateDegree: v.optional(v.number(), 0),
  curveDegree: v.optional(v.number(), 0),
  countSpaces: v.optional(v.boolean(), false),
})
export const SectionStoreSchema = v.merge([
  SectionSchema,
  v.object({
    areaId: v.string(),
  }),
])

// Row
export const RowSchema = v.object({
  id: v.string(),
  number: v.number(),
  seatIds: v.array(v.string()),
})
export const RowStoreSchema = v.merge([
  RowSchema,
  v.object({
    areaId: v.string(),
    sectionId: v.string(),
  }),
])

// Seat
export const SeatSchema = v.object({
  id: v.string(),
  number: v.number(),
})
export const SeatStoreSchema = v.merge([
  SeatSchema,
  v.object({
    areaId: v.string(),
    sectionId: v.string(),
    rowId: v.string(),
  }),
])
