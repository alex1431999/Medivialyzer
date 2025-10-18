export type Creature = {
  name: string
  exp?: number
}

export type CreatureEntry = {
  timestamp: number
} & Creature

export type CreatureGrouped = {
  amount: number
} & Creature

export type CreatureWithAverageLoot = {
  creature: Creature
  averageLootValue: number
}
