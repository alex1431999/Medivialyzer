import { Creature } from '../creature/creature.types.ts'
import { ItemLooted } from '../item/item.types.ts'
import { lootDataTypeItems } from './lootDataType/lootDataTypes/lootDataType.items.ts'
import { lootDataTypeCreature } from './lootDataType/lootDataTypes/lootdataType.creature.ts'

type CreaturesToLootMapEntry = {
  creature: Creature
  items: ItemLooted[]
  count: number
}

type CreaturesToLootMap = Record<string, CreaturesToLootMapEntry>

export class LootParserV2 {
  public parse(lootData: string): CreaturesToLootMap {
    let creaturesToLootMap: CreaturesToLootMap = {}

    this.forEachLine(lootData, (line) => {
      // Creatures with average loot
      if (
        lootDataTypeCreature.matches(line) ||
        lootDataTypeCreature.matchesBag(line)
      ) {
        creaturesToLootMap = this.handleAverageLoot(line, creaturesToLootMap)
      }
    })

    return creaturesToLootMap
  }

  private handleAverageLoot(
    line: string,
    creaturesToLootMap: CreaturesToLootMap,
  ): CreaturesToLootMap {
    const itemsLooted = lootDataTypeItems.toValue(line, [])
    const isBagLoot = lootDataTypeCreature.matchesBag(line)

    const creature = isBagLoot
      ? lootDataTypeCreature.toValueForBag(line)
      : lootDataTypeCreature.toValue(line)

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

      // If the loot came in a bag, then we don't count the extra kill
      const countUpdated = isBagLoot ? count : count + 1
      const itemsUpdated = this.upsertItems(items, itemsLooted)

      creaturesToLootMap[creature.name] = {
        creature,
        items: itemsUpdated,
        count: countUpdated,
      }
    }

    return creaturesToLootMap
  }

  private upsertItems(
    items: ItemLooted[],
    itemsToAdd: ItemLooted[],
  ): ItemLooted[] {
    let itemsUpdated = [...items]

    itemsToAdd.forEach((item) => {
      itemsUpdated = this.upsertItem(itemsUpdated, item)
    })

    return itemsUpdated
  }

  private upsertItem(items: ItemLooted[], item: ItemLooted): ItemLooted[] {
    const itemIndex = items.findIndex(
      (itemCurrent) => itemCurrent.name === item.name,
    )

    if (itemIndex === -1) {
      items.push(item)
    } else {
      items[itemIndex].amount += item.amount
    }

    return items
  }

  private forEachLine(lootData: string, callback: (line: string) => void) {
    const lines = lootData
      .split('\n') // Split by break lines
      .map((line) => line.trim()) // Remove any extra white space
      .filter((line) => !!line) // Get rid of all the empty lines

    let linesPiecedTogehter = []
    let fullLine = ''

    for (let i = 0; i < lines.length; ++i) {
      const currentLine = lines[i]
      const nextLine = lines[i + 1]

      // We add a space here because when lines go over multiple liens the space gets lost
      fullLine += `${currentLine} `

      // If there is no next line or the next line starts a new line we completed the current line
      if (nextLine === undefined || this.isValidStartOfLine(nextLine)) {
        linesPiecedTogehter.push(fullLine.trim())
        fullLine = ''
      }
    }

    linesPiecedTogehter.forEach(callback)
  }

  private isValidStartOfLine(line: string) {
    const VALID_OPTIONS = [
      /^channel saved at/, // String starts with "channel saved at"
      /^\d{2}:\d{2}/, // String starts with HH:MM
      /^$/, // Empty string
    ]

    return VALID_OPTIONS.some((pattern) => pattern.test(line.toLowerCase()))
  }
}
