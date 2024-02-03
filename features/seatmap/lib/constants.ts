// Manual constants
export const SEAT_SIZE = 20

// Dependent on seat size
export const SEAT_STROKE_RATIO = 0.06
export const ROW_GAP_RATIO = 1.5

// Auto-generated constants
export const SEAT_STROKE_WIDTH = SEAT_SIZE * SEAT_STROKE_RATIO
export const SEAT_INNER_SIZE = SEAT_SIZE - SEAT_STROKE_WIDTH / 2
export const ROW_GAP = SEAT_SIZE * ROW_GAP_RATIO
export const ROW_OFFSET = SEAT_INNER_SIZE / 2
