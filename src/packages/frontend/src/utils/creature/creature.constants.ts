import { Creature } from './creature.types.ts'

export const CREATURES: Creature[] = []

export function getCreature(name: string): Creature | undefined {
  return CREATURES.find((creature) => creature.name === name)
}
