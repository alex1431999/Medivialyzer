export type Creature = {
  name: string
  exp?: number
}

export type CreatureEntry = {
  timestamp: number
} & Creature
