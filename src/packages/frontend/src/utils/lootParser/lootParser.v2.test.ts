import { describe, expect, test } from 'vitest'
import { LootParserV2 as LootParser } from './lootParser.v2.ts'

describe('lootParser', () => {
  describe('loot', () => {
    test('no loot', () => {
      const lootParser = new LootParser()
      expect(lootParser.parse('')).toEqual({})
    })

    test('items', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: a gold coin.
        `
      const lootParser = new LootParser()
      expect(lootParser.parse(lootData)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 1,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'giant cobra',
          },
        },
      })
    })

    test('plural', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: 66 gold coins.
        `

      const lootParser = new LootParser()
      expect(lootParser.parse(lootData)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 66,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'giant cobra',
          },
        },
      })
    })

    /**
     * Sometimes medivia writes the loot as multiple lines in to the loot.txt.
     * We deal with that bug by trying to piece together the line
     */
    test('multiline bug', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of 
        giant 
        cobra: a gold 
        coin.
        `
      const lootParser = new LootParser()
      expect(lootParser.parse(lootData)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 1,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'giant cobra',
          },
        },
      })
    })

    test('multiline bug (complex)', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of 
        giant 
        cobra: a gold 
        coin.
        
        Channel saved at Wed Dec 04 19:40:20 2025
        19:12 Loot of giant 
        cobra: 12 gold coins.
        `
      const lootParser = new LootParser()
      expect(lootParser.parse(lootData)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 13,
              name: 'gold coin',
            },
          ],
          count: 2,
          creature: {
            name: 'giant cobra',
          },
        },
      })
    })
  })

  describe('creatures', () => {
    test('no creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        `
      const lootParser = new LootParser()

      expect(lootParser.parse(lootData)).toEqual({})
    })

    test('one creature', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 9 gold coins.
        `
      const lootParser = new LootParser()
      expect(lootParser.parse(lootData)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 9,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'giant cobra',
          },
        },
      })
    })

    test('many creatures', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:19 Loot of giant cobra: 9 gold coins.
        19:19 Loot of winged vermin: 17 gold coins.
        `
      const lootParser = new LootParser()
      expect(lootParser.parse(lootData)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 9,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'giant cobra',
          },
        },
        ['winged vermin']: {
          items: [
            {
              amount: 17,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'winged vermin',
          },
        },
      })
    })
  })

  describe('getDataSince', () => {
    test('all of the data', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:40 Loot of giant cobra: 9 gold coins.
        Channel saved at Wed Dec 04 20:29:20 2024
        20:40 Loot of winged vermin: 17 gold coins.
        `

      const lootParser = new LootParser()
      const lootDataSince = lootParser.getLootDataSince(lootData, 0)

      expect(lootParser.parse(lootDataSince)).toEqual({
        ['giant cobra']: {
          items: [
            {
              amount: 9,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'giant cobra',
          },
        },
        ['winged vermin']: {
          items: [
            {
              amount: 17,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'winged vermin',
          },
        },
      })
    })

    test('some of the data', () => {
      const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:40 Loot of giant cobra: 9 gold coins.
        Channel saved at Wed Dec 04 20:29:20 2024
        20:40 Loot of winged vermin: 17 gold coins.
        `

      const since = new Date('Wed Dec 04 20:29:20 2024').getTime()
      const lootParser = new LootParser()
      const lootDataSince = lootParser.getLootDataSince(lootData, since)

      expect(lootParser.parse(lootDataSince)).toEqual({
        ['winged vermin']: {
          items: [
            {
              amount: 17,
              name: 'gold coin',
            },
          ],
          count: 1,
          creature: {
            name: 'winged vermin',
          },
        },
      })
    })
  })
})
