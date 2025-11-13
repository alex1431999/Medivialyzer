import { describe, test, expect } from 'vitest'
import { ItemLooted } from '../item/item.types.ts'
import { mergeItemsLooted, upsertItemLooted } from './lootParser.helpers.ts'

describe('loot parser helpers', () => {
  describe('upsertItemLooted', () => {
    test('item does not exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const item: ItemLooted = { name: 'ham', amount: 5 }

      expect(upsertItemLooted(items, item)).toEqual([
        { name: 'gold coin', amount: 1 },
        { name: 'ham', amount: 5 },
      ])
    })

    test('item does exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const item: ItemLooted = { name: 'gold coin', amount: 5 }

      expect(upsertItemLooted(items, item)).toEqual([
        { name: 'gold coin', amount: 6 },
      ])
    })
  })

  describe('mergeItemsLooted', () => {
    test('items do not exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const itemsToAdd: ItemLooted[] = [{ name: 'ham', amount: 5 }]

      expect(mergeItemsLooted(items, itemsToAdd)).toEqual([
        { name: 'gold coin', amount: 1 },
        { name: 'ham', amount: 5 },
      ])
    })

    test('items do exist in the list yet', () => {
      const items: ItemLooted[] = [{ name: 'gold coin', amount: 1 }]
      const itemsToAdd: ItemLooted[] = [{ name: 'gold coin', amount: 5 }]

      expect(mergeItemsLooted(items, itemsToAdd)).toEqual([
        { name: 'gold coin', amount: 6 },
      ])
    })
  })
})
