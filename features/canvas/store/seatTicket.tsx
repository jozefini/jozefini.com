'use client'

import { MapStore } from './mapStore'

export const {
  getMapItem: getSeatTicket,
  useMapItem: useSeatTicket,
  setMapItem: setSeatTicket,
  updateMapItem: updateSeatTicket,
  deleteMapItem: deleteSeatTicket,
  clearMap: deleteAllSeatTickets,
} = new MapStore<string>()
