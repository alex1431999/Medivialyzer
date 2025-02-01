import { Creature, CreatureGrouped } from './creature.types.ts'

export function groupCreatures(creatures: Creature[]): CreatureGrouped[] {
  const creaturesMap: Record<Creature['name'], CreatureGrouped> = {}

  creatures.forEach((creature) => {
    if (creaturesMap[creature.name]) {
      creaturesMap[creature.name].amount += 1
    } else {
      creaturesMap[creature.name] = { ...creature, amount: 1 }
    }
  })

  return Object.values(creaturesMap)
}
