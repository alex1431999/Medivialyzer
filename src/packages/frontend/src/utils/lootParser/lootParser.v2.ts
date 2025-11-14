import { Creature } from '../creature/creature.types.ts'
import { ItemLooted } from '../item/item.types.ts'
import { lootDataTypeItems } from './lootDataType/lootDataTypes/lootDataType.items.ts'
import { lootDataTypeCreature } from './lootDataType/lootDataTypes/lootdataType.creature.ts'
import { lootDataTypeTimestamp } from './lootDataType/lootDataTypes/lootDataType.timestamp.ts'
import { mergeItems } from './lootParser.helpers.ts'
import { runWorkerLootParserV2 } from '../../workers/worker.utils.ts'

type CreaturesToLootMapEntry = {
  creature: Creature
  items: ItemLooted[]
  count: number
}

export type CreaturesToLootMap = Record<string, CreaturesToLootMapEntry>

export class LootParserV2 {
  public parse(lootData: string) {
    if (this.parseInBackground) {
      return this.parseAsync(lootData)
    } else {
      return this.parseSync(lootData)
    }
  }

  public parseAsync(lootData: string) {
    return runWorkerLootParserV2(lootData)
  }

  public parseSync(lootData: string): CreaturesToLootMap {
    let creaturesToLootMap: CreaturesToLootMap = {}

    this.forEachLine(lootData, (line) => {
      if (
        lootDataTypeCreature.matches(line) ||
        lootDataTypeCreature.matchesBag(line)
      ) {
        creaturesToLootMap = this.parseCreatureLootLine(
          line,
          creaturesToLootMap,
        )
      }
    })

    return creaturesToLootMap
  }

  // TODO this should be optimised using a binary search
  public getLootDataSince(lootData: string, since: number): string {
    const lines = this.lootDataToLines(lootData)

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (lootDataTypeTimestamp.matches(line)) {
        const timestamp = lootDataTypeTimestamp.toValue(line)

        if (timestamp >= since) {
          const remainingLines = lines.slice(i)
          return remainingLines.join('\n')
        }
      }
    }

    // If the timestamp is newer than the lootData, we return nothing
    return ''
  }

  /**
   * If this is true, we will parse using a background worker, if it is false
   * we will parse on the main process. This allows us to run tests on the
   * main process and use workes in production where they are availab.e
   * @private
   */
  private get parseInBackground() {
    return window.Worker !== undefined
  }

  private parseCreatureLootLine(
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
      const itemsUpdated = mergeItems(items, itemsLooted)

      creaturesToLootMap[creature.name] = {
        creature,
        items: itemsUpdated,
        count: countUpdated,
      }
    }

    return creaturesToLootMap
  }

  private forEachLine(lootData: string, callback: (line: string) => void) {
    const lines = this.lootDataToLines(lootData)
    lines.forEach(callback)
  }

  private lootDataToLines(lootData: string): string[] {
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

    return linesPiecedTogehter
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
