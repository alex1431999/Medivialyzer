import { lootDataTypeItems } from './lootDataType/lootDataTypes/lootDataType.items.ts'
import { lootDataTypeTimestamp } from './lootDataType/lootDataTypes/lootDataType.timestamp.ts'
import { ItemLooted } from '../item/item.types.ts'
import { LootEntry } from '../loot/loot.types.ts'
import {
  Creature,
  CreatureEntry,
  CreatureWithAverageLoot,
} from '../creature/creature.types.ts'
import { lootDataTypeCreature } from './lootDataType/lootDataTypes/lootdataType.creature.ts'
import _ from 'lodash'

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

  public getCreaturesAverageLootValue(): CreatureWithAverageLoot[] {
    const creaturesToLootMap: Record<
      string,
      { creature: Creature; items: ItemLooted[]; count: number }
    > = {}

    this.forEachLine((line) => {
      if (lootDataTypeItems.matches(line)) {
        const creature: Creature = lootDataTypeCreature.toValue(line)
        const itemsLooted = lootDataTypeItems.toValue(line)

        const creatureAlreadyExists = Object.keys(creaturesToLootMap).includes(
          creature.name,
        )

        if (!creatureAlreadyExists) {
          creaturesToLootMap[creature.name] = {
            creature,
            items: itemsLooted,
            count: 1,
          }
        } else {
          const { items, count } = creaturesToLootMap[creature.name]
          creaturesToLootMap[creature.name] = {
            creature,
            items: [...items, ...itemsLooted],
            count: count + 1,
          }
        }
      }
    })

    return Object.values(creaturesToLootMap).map((entry) => {
      const totalLootValue = _.sum(
        _.map(entry.items, (item) => (item.value || 0) * item.amount),
      )
      const averageLootValue = totalLootValue / entry.count

      // TODO calculate confidence
      return { averageLootValue, creature: entry.creature, confidence: 1 }
    })
  }

  private forEachLine(callback: (line: string) => void) {
    this.lootData.split('\n').forEach(callback)
  }
}
