import { describe, expect, test } from 'vitest'
import { LootParser } from './lootParser.ts'

describe('lootParser', () => {
  describe('getLoot', () => {
    test('no loot', () => {
      const lootParser = new LootParser('')
      expect(lootParser.getLoot(0)).toEqual([])
    })

    test('known item', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: a gold coin.
        `
      const lootParser = new LootParser(lootData)
      expect(lootParser.getLoot(0)).toEqual([
        {
          item: {
            name: 'Gold Coin',
            value: 1,
          },
          amount: 1,
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })

    test('unknown item', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: an unknown.
        `
      const lootParser = new LootParser(lootData)
      expect(lootParser.getLoot(0)).toEqual([
        {
          item: {
            name: 'unknown',
          },
          amount: 1,
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })

    test('know item that looks like plural', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: ancient boots.
        `
      const lootParser = new LootParser(lootData)
      expect(lootParser.getLoot(0)).toEqual([
        {
          item: {
            name: 'Ancient Boots',
            value: 5000,
            NPCs: expect.anything(),
          },
          amount: 1,
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })

    test('plural (known item)', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: 66 gold coins.
        `
      const lootParser = new LootParser(lootData)
      expect(lootParser.getLoot(0)).toEqual([
        {
          item: {
            name: 'Gold Coin',
            value: 1,
          },
          amount: 66,
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })

    test('plural (unknown item)', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: 66 unknowns.
        `
      const lootParser = new LootParser(lootData)
      expect(lootParser.getLoot(0)).toEqual([
        {
          item: {
            name: 'unknown',
          },
          amount: 66,
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })
  })

  describe('getCreatures', () => {
    test('no creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.getCreatures(0)).toEqual([])
    })

    test('one creature', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 9 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.getCreatures(0)).toEqual([
        {
          name: 'giant cobra',
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })

    test('many creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 9 gold coins.
        19:19 Loot of winged vermin: 17 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.getCreatures(0)).toEqual([
        {
          name: 'giant cobra',
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
        {
          name: 'winged vermin',
          timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime(),
        },
      ])
    })
  })
})
