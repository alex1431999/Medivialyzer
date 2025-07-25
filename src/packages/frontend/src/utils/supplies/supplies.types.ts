import { SUPPLIES } from './supplies.constants.ts'

export type SupplyName = (typeof SUPPLIES)[number]['name']

export type Supply = (typeof SUPPLIES)[number]
