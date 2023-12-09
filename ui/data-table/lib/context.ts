import { createContext } from 'react'
import { DataTable } from './types'

export const DataTableContext = createContext<DataTable | undefined>(undefined)
