import { lootDataTypeItems } from './lootDataType/lootDataTypes/lootDataType.items.ts'
import { lootDataTypeTimestamp } from './lootDataType/lootDataTypes/lootDataType.timestamp.ts'
import { Item, ItemLooted } from '../item/item.types.ts'
import { LootEntry } from '../loot/loot.types.ts'
import {
  Creature,
  CreatureEntry,
  CreatureWithAverageLoot,
} from '../creature/creature.types.ts'
import { lootDataTypeCreature } from './lootDataType/lootDataTypes/lootdataType.creature.ts'
import _ from 'lodash'
import { getAllItems } from '../item/item.helpers.ts'

export type LootDataParsed = {
  loot: LootEntry[]
  creatures: CreatureEntry[]
  creaturesCurrentHunt: CreatureEntry[]
  creaturesWithAverageLoot: CreatureWithAverageLoot[]
  creaturesWithAverageLootCurrentHunt: CreatureWithAverageLoot[]
}

export type LootParserOptions = {
  since?: number
  items?: Item[]
}

type CreaturesToLootMap = Record<
  string,
  { creature: Creature; items: ItemLooted[]; count: number }
>

export class LootParser {
  private readonly lootData: string

  constructor(lootData: string) {
    this.lootData = lootData
  }

  public parse(options?: LootParserOptions): LootDataParsed {
    const since = options?.since || 0
    const allItems = options?.items || getAllItems()
    const lootDataParsed: LootDataParsed = {
      loot: [],
      creatures: [],
      creaturesCurrentHunt: [],
      creaturesWithAverageLoot: [],
      creaturesWithAverageLootCurrentHunt: [],
    }

    let creaturesToLootMap: CreaturesToLootMap = {}
    let creaturesCurrentHuntToLootMap: CreaturesToLootMap = {}

    let currentTimestamp = 0
    this.forEachLine((line) => {
      // Timestamp
      if (lootDataTypeTimestamp.matches(line)) {
        currentTimestamp = lootDataTypeTimestamp.toValue(line)
      }

      // Items
      if (lootDataTypeItems.matches(line) && since < currentTimestamp) {
        const items = this.handleItems(line, currentTimestamp, allItems)
        lootDataParsed.loot = lootDataParsed.loot.concat(items)
      }

      // Creature
      if (lootDataTypeCreature.matches(line)) {
        const creature = this.handleCreature(line, currentTimestamp)

        lootDataParsed.creatures.push(creature)

        if (since < currentTimestamp) {
          lootDataParsed.creaturesCurrentHunt.push(creature)
        }
      }

      // Creatures with average loot
      if (
        lootDataTypeCreature.matches(line) ||
        lootDataTypeCreature.matchesBag(line)
      ) {
        creaturesToLootMap = this.handleAverageLoot(
          line,
          creaturesToLootMap,
          allItems,
        )

        if (since < currentTimestamp) {
          creaturesCurrentHuntToLootMap = this.handleAverageLoot(
            line,
            creaturesCurrentHuntToLootMap,
            allItems,
          )
        }
      }
    })

    lootDataParsed.creaturesWithAverageLoot =
      this.calculateCreaturesWithAverageLoot(creaturesToLootMap)

    lootDataParsed.creaturesWithAverageLootCurrentHunt =
      this.calculateCreaturesWithAverageLoot(creaturesCurrentHuntToLootMap)

    return lootDataParsed
  }

  private handleItems(
    line: string,
    currentTimestamp: number,
    allItems: Item[],
  ): LootEntry[] {
    const items: ItemLooted[] = lootDataTypeItems.toValue(line, allItems)
    return items.map(({ amount, ...item }) => ({
      item,
      amount,
      timestamp: currentTimestamp,
    }))
  }

  private handleCreature(
    line: string,
    currentTimestamp: number,
  ): CreatureEntry {
    const creature: Creature = lootDataTypeCreature.toValue(line)
    return {
      ...creature,
      timestamp: currentTimestamp,
    }
  }

  private handleAverageLoot(
    line: string,
    creaturesToLootMap: CreaturesToLootMap,
    allItems: Item[],
  ): CreaturesToLootMap {
    const itemsLooted = lootDataTypeItems.toValue(line, allItems)
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
      const countUpdate = isBagLoot ? count : count + 1

      creaturesToLootMap[creature.name] = {
        creature,
        items: [...items, ...itemsLooted],
        count: countUpdate,
      }
    }

    return creaturesToLootMap
  }

  private calculateCreaturesWithAverageLoot(
    creaturesToLootMap: CreaturesToLootMap,
  ): CreatureWithAverageLoot[] {
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
    const lines = this.lootData
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
