import { Item } from '../item/item.types.ts'

export type LootEntry = {
  item: Item
  timestamp: number
  amount: number
}
