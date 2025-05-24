import { SupplyName } from '../utils/supplies/supplies.types.ts'

export type VocationName = 'KNIGHT' | 'ARCHER' | 'DRUID' | 'MAGE'

export type Vocation = {
  name: string
  supplies: SupplyName[]
}
