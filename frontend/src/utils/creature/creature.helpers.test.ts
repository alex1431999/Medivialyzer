import { describe, test, expect } from 'vitest'
import { CreatureEntry, CreatureGrouped } from './creature.types.ts'
import { getCreatureKillsPerHour } from './creature.helpers.ts'

const ONE_HOUR = 3600000 // in ms

describe('getCreatureKillsPerHour', () => {
  test('no kills', () => {
    const creature: CreatureGrouped = { name: 'rotworm', amount: 0 }
    const creatures: CreatureEntry[] = []

    expect(getCreatureKillsPerHour(creature, creatures)).toEqual(0)
  })

  test('2 an hour', () => {
    const creature: CreatureGrouped = { name: 'rotworm', amount: 2 }
    const creatures: CreatureEntry[] = [
      { name: 'rotworm', timestamp: Date.now() },
      { name: 'rotworm', timestamp: Date.now() - ONE_HOUR },
    ]

    expect(getCreatureKillsPerHour(creature, creatures)).toEqual(2)
  })

  test('4 an hour', () => {
    const creature: CreatureGrouped = { name: 'rotworm', amount: 2 }
    const creatures: CreatureEntry[] = [
      { name: 'rotworm', timestamp: Date.now() },
      { name: 'rotworm', timestamp: Date.now() - ONE_HOUR / 2 },
    ]

    // We killed 2 in 30 minutes, therefore we kill 4 an hour
    expect(getCreatureKillsPerHour(creature, creatures)).toEqual(4)
  })
})
