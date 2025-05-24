import { SupplyName } from '../utils/supplies/supplies.types.ts'

export type VocationIdentifier = 'KNIGHT' | 'ARCHER' | 'DRUID' | 'MAGE'

export type Vocation = {
  id: VocationIdentifier
  name: string
  supplies: SupplyName[]
}
