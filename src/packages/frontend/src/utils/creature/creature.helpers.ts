import {
  Creature,
  CreatureEntry,
  CreatureGrouped,
  CreatureWithLoot,
} from './creature.types.ts'
import _ from 'lodash'

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

export function getCreatureWithLoot(
  creaturesWithLoot: CreatureWithLoot[],
  creature: CreatureGrouped,
): CreatureWithLoot {
  const creatureWithLoot = creaturesWithLoot.find(
    (creaturesWithLoot) => creaturesWithLoot.creature.name === creature.name,
  )

  if (!creatureWithLoot)
    throw new Error(
      `No creature with average loot found for creature ${creature.toString()}`,
    )

  return creatureWithLoot
}

export function getCreatureKillsPerHour(
  creature: CreatureGrouped,
  creatures: CreatureEntry[],
): number | undefined {
  const creaturesSorted = _.sortBy(creatures, 'timestamp')

  const firstKill = creaturesSorted.find(
    (creatureCurrent) => creatureCurrent.name === creature.name,
  )

  const lastKill = creaturesSorted
    .reverse()
    .find((creatureCurrent) => creatureCurrent.name === creature.name)

  const start = firstKill?.timestamp || Date.now()
  const end = lastKill?.timestamp || Date.now()

  const kills = creature.amount

  if (start === end) return kills

  return Math.ceil((kills / (end - start)) * 1000 * 60 * 60)
}
