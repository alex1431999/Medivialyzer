import { SUPPLIES } from './supplies.constants.ts'

export type SupplyName = (typeof SUPPLIES)[number]['name']
