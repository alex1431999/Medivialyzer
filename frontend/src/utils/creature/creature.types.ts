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
  confidence: number // a number between 0 and 1 where 1 is very confident
}
