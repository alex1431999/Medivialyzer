import { SupplyName } from './supplies.types.ts'
import { SUPPLIES } from './supplies.constants.ts'

export function getSupplyByNameSafe(name: SupplyName) {
  const supply = SUPPLIES.find((supply) => supply.name === name)

  if (!supply) throw new Error(`Supply ${name} not found`)

  return supply
}
