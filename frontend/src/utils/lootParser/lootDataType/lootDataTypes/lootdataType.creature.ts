import { LootDataType } from '../lootDataType.ts'
import { Creature } from '../../../creature/creature.types.ts'
import { getCreature } from '../../../creature/creature.constants.ts'

export class LootDataTypeCreature extends LootDataType {
  public type = 'timestamp'

  public matches(line: string): boolean {
    return line.trim().toLowerCase().startsWith('loot of')
  }

  public toValue(line: string): Creature {
    const parts = line.toLowerCase().split('loot of')
    const creaturePart = parts[1]
    const creatureName = creaturePart.split(':')[0].trim()

    const creatureFound = getCreature(creatureName)
    const unknownCreature: Creature = { name: creatureName }

    return creatureFound || unknownCreature
  }
}

export const lootDataTypeCreature = new LootDataTypeCreature()
