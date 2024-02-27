'use client'

import { MapStore } from './map-store'

export const {
  getMapItem: getExpenses,
  getMapKeys: getExpensesKeys,
  useMapItem: useExpenses,
  useMapKeys: useExpensesKeys,
  setMapItem: setExpenses,
  updateMapItem: updateExpenses,
  deleteMapItem: deleteExpenses,
  clearMap: deleteAllExpensess,
} = new MapStore<string, number>()

export const {
  getMapItem: getCalculator,
  getMapKeys: getCalculatorKeys,
  useMapItem: useCalculator,
  useMapKeys: useCalculatorKeys,
  setMapItem: setCalculator,
  updateMapItem: updateCalculator,
  deleteMapItem: deleteCalculator,
  clearMap: deleteAllCalculators,
} = new MapStore<'taxPercentage' | 'income', number>({
  initialStates: [
    ['taxPercentage', 15],
    ['income', 0],
  ],
})
