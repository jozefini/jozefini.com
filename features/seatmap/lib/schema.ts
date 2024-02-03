import * as v from 'valibot'

// Area
const AreaSchema = v.object({
  id: v.string(),
  name: v.string(),
  sectionIds: v.array(v.string()),
})
export type AreaIn = v.Input<typeof AreaSchema>
export type AreaOut = v.Output<typeof AreaSchema>

// Section
const SectionSchema = v.object({
  id: v.string(),
  rowIds: v.array(v.string()),
})
export type SectionIn = v.Input<typeof SectionSchema>
export type SectionOut = v.Output<typeof SectionSchema>

// Row
const RowSchema = v.object({
  id: v.string(),
  x: v.number(),
  y: v.number(),
  seatIds: v.array(v.string()),
  curveDeg: v.optional(v.number(), 0),
})
export type RowIn = v.Input<typeof RowSchema>
export type RowOut = v.Output<typeof RowSchema>

// Seat
const SeatSchema = v.object({
  id: v.string(),
  number: v.string(),
})
export type SeatIn = v.Input<typeof SeatSchema>
export type SeatOut = v.Output<typeof SeatSchema>
