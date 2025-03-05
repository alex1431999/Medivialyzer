import { describe, expect, test } from 'vitest'
import { LootParser } from './lootParser.ts'

describe('lootParser', () => {
  describe('loot', () => {
    test('no loot', () => {
      const lootParser = new LootParser('')
      expect(lootParser.parse({ since: 0 }).loot).toEqual([])
    })

    test('known item', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: a gold coin.
        `
      const lootParser = new LootParser(lootData)
      expect(lootParser.parse({ since: 0 }).loot).toEqual([
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
      expect(lootParser.parse({ since: 0 }).loot).toEqual([
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
      expect(lootParser.parse({ since: 0 }).loot).toEqual([
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
      expect(lootParser.parse({ since: 0 }).loot).toEqual([
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
      expect(lootParser.parse({ since: 0 }).loot).toEqual([
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

  describe('creatures', () => {
    test('no creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creatures).toEqual([])
    })

    test('one creature', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 9 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creatures).toEqual([
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

      expect(lootParser.parse({ since: 0 }).creatures).toEqual([
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

  describe('creatures with average loot', () => {
    test('no creatures', () => {
      const lootData = ``
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creaturesWithAverageLoot).toEqual(
        [],
      )
    })

    test('one creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 9 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creaturesWithAverageLoot).toEqual([
        {
          averageLootValue: 9,
          confidence: expect.any(Number),
          creature: {
            name: 'giant cobra',
          },
        },
      ])
    })

    test('two of the same creature', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 7 gold coins.
        19:19 Loot of giant cobra: 3 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creaturesWithAverageLoot).toEqual([
        {
          averageLootValue: 5,
          confidence: expect.any(Number),
          creature: {
            name: 'giant cobra',
          },
        },
      ])
    })

    test('two different creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 7 gold coins.
        19:19 Loot of bat: 3 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creaturesWithAverageLoot).toEqual([
        {
          averageLootValue: 7,
          confidence: expect.any(Number),
          creature: {
            name: 'giant cobra',
          },
        },
        {
          averageLootValue: 3,
          confidence: expect.any(Number),
          creature: {
            name: 'bat',
          },
        },
      ])
    })

    test('bag', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 7 gold coins.
        19:33 Content of a bag within the corpse of giant cobra: 12 gold coins.
        `
      const lootParser = new LootParser(lootData)

      expect(lootParser.parse({ since: 0 }).creaturesWithAverageLoot).toEqual([
        {
          averageLootValue: 19,
          confidence: expect.any(Number),
          creature: {
            name: 'giant cobra',
          },
        },
      ])
    })
  })
})
