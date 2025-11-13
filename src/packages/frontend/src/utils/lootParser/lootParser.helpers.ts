import { CreaturesToLootMap } from './lootParser.v2.ts'
import { ItemLooted } from '../item/item.types.ts'
import _ from 'lodash'

export function mergeCreaturesToLootMap(
  creaturesToLootMap: CreaturesToLootMap,
  creaturesToLootMapToAdd: CreaturesToLootMap,
) {
  const creaturesToLootMapFinal: CreaturesToLootMap =
    _.cloneDeep(creaturesToLootMap)

  Object.keys(creaturesToLootMapToAdd).forEach((creatureName) => {
    const entryInMap = creaturesToLootMap[creatureName]
    const entryInMapToAdd = creaturesToLootMapToAdd[creatureName]

    const creature = entryInMapToAdd.creature
    const count = (entryInMap?.count || 0) + entryInMapToAdd.count
    const items = mergeItemsLooted(
      entryInMap?.items || [],
      entryInMapToAdd?.items || [],
    )

    creaturesToLootMapFinal[creatureName] = { creature, count, items }
  })

  return creaturesToLootMapFinal
}

export function mergeItemsLooted(
  items: ItemLooted[],
  itemsToAdd: ItemLooted[],
): ItemLooted[] {
  let itemsUpdated = [...items]

  itemsToAdd.forEach((item) => {
    itemsUpdated = upsertItemLooted(itemsUpdated, item)
  })

  return itemsUpdated
}

export function upsertItemLooted(
  items: ItemLooted[],
  item: ItemLooted,
): ItemLooted[] {
  const itemIndex = items.findIndex(
    (itemCurrent) => itemCurrent.name === item.name,
  )

  if (itemIndex === -1) {
    items.push(item)
  } else {
    items[itemIndex].amount += item.amount
  }

  return items
}
