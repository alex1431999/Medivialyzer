import { lootDataTypeItems } from './lootDataType/lootDataTypes/lootDataType.items.ts'
import { lootDataTypeTimestamp } from './lootDataType/lootDataTypes/lootDataType.timestamp.ts'
import { ItemLooted } from '../item/item.types.ts'
import { LootEntry } from '../loot/loot.types.ts'
import { Creature, CreatureEntry } from '../creature/creature.types.ts'
import { lootDataTypeCreature } from './lootDataType/lootDataTypes/lootdataType.creature.ts'

export class LootParser {
  private readonly lootData: string

  constructor(lootData: string) {
    this.lootData = lootData
  }

  public getLoot(since: number): LootEntry[] {
    let loot: LootEntry[] = []
    let currentTimeStamp = 0

    this.forEachLine((line) => {
      if (lootDataTypeTimestamp.matches(line)) {
        currentTimeStamp = lootDataTypeTimestamp.toValue(line)
      }

      if (lootDataTypeItems.matches(line) && since < currentTimeStamp) {
        const items: ItemLooted[] = lootDataTypeItems.toValue(line)
        const lootToAdd = items.map(({ amount, ...item }) => ({
          item,
          amount,
          timestamp: currentTimeStamp,
        }))

        loot = loot.concat(lootToAdd)
      }
    })

    return loot
  }

  public getCreatures(since: number): CreatureEntry[] {
    const creatures: CreatureEntry[] = []
    let currentTimeStamp = 0

    this.forEachLine((line) => {
      if (lootDataTypeTimestamp.matches(line)) {
        currentTimeStamp = lootDataTypeTimestamp.toValue(line)
      }

      if (lootDataTypeItems.matches(line) && since < currentTimeStamp) {
        const creature: Creature = lootDataTypeCreature.toValue(line)
        creatures.push({ ...creature, timestamp: currentTimeStamp })
      }
    })

    return creatures
  }

  private forEachLine(callback: (line: string) => void) {
    this.lootData.split('\n').forEach(callback)
  }
}
