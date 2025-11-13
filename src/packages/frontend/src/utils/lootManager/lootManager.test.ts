import { describe, expect, test } from 'vitest'
import { LootManager } from './lootManager.ts'

describe('LootManager', () => {
  test('addLootData', () => {
    const lootDataInitial = `
      Channel saved at Wed Dec 04 19:29:20 2024
      19:40 Loot of giant cobra: 9 gold coins.
      `
    const lootDataToAdd = `
      Channel saved at Wed Dec 04 20:29:20 2024
      20:40 Loot of winged vermin: 17 gold coins.
      `

    const lootManager = new LootManager()

    lootManager.addLootData(lootDataInitial)
    expect(lootManager.getItems()).toEqual([
      {
        amount: 9,
        name: 'Gold Coin',
        value: 1,
      },
    ])

    lootManager.addLootData(lootDataToAdd)
    expect(lootManager.getItems()).toEqual([
      {
        amount: 9 + 17,
        name: 'Gold Coin',
        value: 1,
      },
    ])
  })
})
