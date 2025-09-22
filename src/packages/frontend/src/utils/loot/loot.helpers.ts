import { LootEntry } from './loot.types.ts'
import { Config } from '../../stores/configStore.ts'

export function groupLoot(loot: LootEntry[]): LootEntry[] {
  const lootEntryByName: Record<string, LootEntry> = {}

  loot.forEach((lootCurrent: LootEntry) => {
    const name = lootCurrent.item.name

    if (Object.keys(lootEntryByName).includes(name)) {
      lootEntryByName[name] = {
        ...lootEntryByName[name],
        amount: lootEntryByName[name].amount + lootCurrent.amount,
      }
    } else {
      lootEntryByName[name] = lootCurrent
    }
  })

  return Object.values(lootEntryByName)
}

/**
 * Takes in loot, filtes out ignored items
 */
export function filterLoot(loot: LootEntry[], config: Config) {
  const lootWithoutIgnoredItems = loot.filter(
    (lootCurrent) => !config.ignoredItems.includes(lootCurrent.item.name),
  )

  if (!config.ignoreItemsWithNoValue) return lootWithoutIgnoredItems

  return lootWithoutIgnoredItems.filter(
    (lootCurrent) =>
      lootCurrent.item.value === undefined || lootCurrent.item.value > 0,
  )
}
