import {
  Creature,
  CreatureGrouped,
  CreatureWithAverageLoot,
} from './creature.types.ts'

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

export function getCreatureWithAverageLoot(
  creaturesWithAverageLoot: CreatureWithAverageLoot[],
  creature: CreatureGrouped,
): CreatureWithAverageLoot {
  const creatureWithAverageLoot = creaturesWithAverageLoot.find(
    (creaturesWithAverageLoot) =>
      creaturesWithAverageLoot.creature.name === creature.name,
  )

  if (!creatureWithAverageLoot)
    throw new Error(
      `No creature with average loot found for creature ${creature.toString()}`,
    )

  return creatureWithAverageLoot
}
