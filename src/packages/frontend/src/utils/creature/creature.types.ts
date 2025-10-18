import { Item } from '../item/item.types.ts'

export type Creature = {
  name: string
}

export type LootTableItem = {
  item: Item
  dropChance: number
}

export type LootTable = LootTableItem[]

export type CreatureEntry = {
  timestamp: number
} & Creature

export type CreatureGrouped = {
  amount: number
} & Creature

export type CreatureWithLoot = {
  creature: Creature
  averageLootValue: number
  lootTable: LootTable
}
