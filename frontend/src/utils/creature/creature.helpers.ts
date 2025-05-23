import {
  Creature,
  CreatureEntry,
  CreatureGrouped,
  CreatureWithAverageLoot,
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

  // We need at least 2 kills to get an understanding of how many kills an hour you get
  if (start === end) return undefined

  return Math.ceil((kills / (end - start)) * 1000 * 60 * 60)
}
