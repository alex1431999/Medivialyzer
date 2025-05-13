import { LootDataType } from '../lootDataType.ts'
import { Creature } from '../../../creature/creature.types.ts'
import { getCreature } from '../../../creature/creature.constants.ts'

export class LootDataTypeCreature extends LootDataType {
  public type = 'timestamp'

  public matches(line: string): boolean {
    return this.matchesLootOf(line)
  }

  public matchesBag(line: string): boolean {
    return line.trim().toLowerCase().includes('content of a bag')
  }

  public toValue(line: string): Creature {
    const parts = line.toLowerCase().split('loot of')
    const creaturePart = parts[1]
    const creatureName = creaturePart.split(':')[0].trim()

    const creatureFound = getCreature(creatureName)
    const unknownCreature: Creature = { name: creatureName }

    return creatureFound || unknownCreature
  }

  public toValueForBag(line: string): Creature {
    const parts = line
      .toLowerCase()
      .split('content of a bag within the corpse of')
    const creaturePart = parts[1]
    const creatureName = creaturePart.split(':')[0].trim()

    const creatureFound = getCreature(creatureName)
    const unknownCreature: Creature = { name: creatureName }

    return creatureFound || unknownCreature
  }
}

export const lootDataTypeCreature = new LootDataTypeCreature()
