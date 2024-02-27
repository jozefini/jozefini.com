// Manual constants
export const SEAT_SIZE = 20
export const DISABLED_SEAT_CIRCLE_FILL = '#bbb'
export const DISABLED_SEAT_TEXT_FILL = '#fff'
export const LIGHTER_SEAT_TEXT_FILL = '#000'
export const DARKER_SEAT_TEXT_FILL = '#fff'

// Dependent on seat size
export const SEAT_STROKE_RATIO = 0.25
export const SEAT_ASSIGNED_STROKE_RATIO = 0.5
export const ROW_GAP_RATIO = 1
export const SEAT_RADIUS = SEAT_SIZE / 2

// Auto-generated constants
export const SEAT_STROKE_WIDTH = SEAT_SIZE * SEAT_STROKE_RATIO
export const SEAT_ASSIGNED_STROKE_WIDTH = SEAT_SIZE * SEAT_ASSIGNED_STROKE_RATIO
export const SEAT_INNER_SIZE = SEAT_SIZE - SEAT_STROKE_WIDTH / 2
export const SEAT_INNER_RADIUS = SEAT_INNER_SIZE / 2
export const SEAT_ASSIGNED_INNER_SIZE =
  SEAT_SIZE - SEAT_ASSIGNED_STROKE_WIDTH / 2
export const SEAT_ASSIGNED_INNER_RADIUS = SEAT_ASSIGNED_INNER_SIZE / 2
export const ROW_GAP = SEAT_SIZE * ROW_GAP_RATIO
export const ROW_GAP_OFFSET = SEAT_SIZE + ROW_GAP

// export const SEAT_TAP_STROKE_SIZE = SEAT_SIZE * SEAT_TAP_RATIO
// export const SEAT_TAP_INNER_SIZE = SEAT_SIZE
