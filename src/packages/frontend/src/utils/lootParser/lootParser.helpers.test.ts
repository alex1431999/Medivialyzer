import { describe, test, expect } from 'vitest'
import { ItemLooted } from '../item/item.types.ts'
import {
  mergeCreaturesToLootMap,
  mergeItems,
  upsertItem,
} from './lootParser.helpers.ts'
import { CreaturesToLootMap } from './lootParser.v2.ts'

describe('loot parser helpers', () => {
  describe('upsertItemLooted', () => {
    test('item does not exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const item: ItemLooted = { name: 'ham', amount: 5 }

      expect(upsertItem(items, item)).toEqual([
        { name: 'gold coin', amount: 1 },
        { name: 'ham', amount: 5 },
      ])
    })

    test('item does exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const item: ItemLooted = { name: 'gold coin', amount: 5 }

      expect(upsertItem(items, item)).toEqual([
        { name: 'gold coin', amount: 6 },
      ])
    })
  })

  describe('mergeItemsLooted', () => {
    test('items do not exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const itemsToAdd: ItemLooted[] = [{ name: 'ham', amount: 5 }]

      expect(mergeItems(items, itemsToAdd)).toEqual([
        { name: 'gold coin', amount: 1 },
        { name: 'ham', amount: 5 },
      ])
    })

    test('items do exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const itemsToAdd: ItemLooted[] = [{ name: 'gold coin', amount: 5 }]

      expect(mergeItems(items, itemsToAdd)).toEqual([
        { name: 'gold coin', amount: 6 },
      ])
    })
  })

  describe('mergeCreaturesToLootMap', () => {
    test('creature does not exist in the list yet', () => {
      const creaturesToLootMap: CreaturesToLootMap = {
        cobra: {
          creature: { name: 'cobra' },
          count: 1,
          items: [{ name: 'gold coin', amount: 1 }],
        },
      }
      const creaturesToLootMapToAdd: CreaturesToLootMap = {
        snake: {
          creature: { name: 'snake' },
          count: 1,
          items: [{ name: 'gold coin', amount: 5 }],
        },
      }

      expect(
        mergeCreaturesToLootMap(creaturesToLootMap, creaturesToLootMapToAdd),
      ).toEqual({
        cobra: {
          creature: { name: 'cobra' },
          count: 1,
          items: [{ name: 'gold coin', amount: 1 }],
        },
        snake: {
          creature: { name: 'snake' },
          count: 1,
          items: [{ name: 'gold coin', amount: 5 }],
        },
      })
    })

    test('creature does exist in the list yet', () => {
      const creaturesToLootMap: CreaturesToLootMap = {
        cobra: {
          creature: { name: 'cobra' },
          count: 1,
          items: [{ name: 'gold coin', amount: 1 }],
        },
      }
      const creaturesToLootMapToAdd: CreaturesToLootMap = {
        cobra: {
          creature: { name: 'cobra' },
          count: 1,
          items: [{ name: 'gold coin', amount: 5 }],
        },
      }

      expect(
        mergeCreaturesToLootMap(creaturesToLootMap, creaturesToLootMapToAdd),
      ).toEqual({
        cobra: {
          creature: { name: 'cobra' },
          count: 2,
          items: [{ name: 'gold coin', amount: 6 }],
        },
      })
    })
  })
})
