import { LootDataType } from '../lootDataType.ts'
import { Item, ItemLooted } from '../../../item/item.types.ts'
import { getItem } from '../../../item/item.helpers.ts'
import { singularize } from '../../../string.ts'

// These items you can always ignore since they are special cases and don't represent and actual item
const LOOT_TO_ALWAYS_IGNORE = ['empty', 'bag']

export class LootDataTypeItems extends LootDataType {
  public type = 'loot'

  public matches(line: string): boolean {
    return this.matchesLootOf(line) || this.matchesBag(line)
  }

  public toValue(line: string, items?: Item[]): ItemLooted[] {
    const lootString = line.toLowerCase().split(':')[2]
    const lootValues = lootString.split(',')

    return lootValues
      .map((lootValue) => {
        const valueSanitised = this.sanitiseValue(lootValue)
        const [amountString, ...potentialNameString] = valueSanitised.split(' ')

        const hasAnAmount = !isNaN(amountString as any)
        const name = hasAnAmount
          ? potentialNameString.join(' ')
          : valueSanitised
        const nameSingular = hasAnAmount ? singularize(name) : name
        const amount = hasAnAmount ? parseInt(amountString, 10) : 1

        if (LOOT_TO_ALWAYS_IGNORE.includes(name)) return []

        // If it is a known item, great! Return it, otherwise return it as an unknown item
        const knownItem = getItem(name, items)
        const unknownItem: ItemLooted = { name: nameSingular, amount } // For unknown items we will always assume the singular name
        const item = knownItem || unknownItem

        return { ...item, amount }
      })
      .flat()
  }

  private sanitiseValue(lootValue: string): string {
    const lootValueTrimmed = lootValue.trim() // Remove white space
    const lootValueWithoutDot = lootValueTrimmed.replace(/\./g, '') // Remove trailing dot

    if (
      lootValueWithoutDot.startsWith('a ') ||
      lootValueWithoutDot.startsWith('an ')
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...rest] = lootValueWithoutDot.split(' ')
      return rest.join(' ').toLowerCase()
    }

    return lootValueWithoutDot.toLowerCase()
  }
}

export const lootDataTypeItems = new LootDataTypeItems()
