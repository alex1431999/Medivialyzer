import {LootDataType} from "../lootDataType.ts";
import {ItemLooted} from "../../../item/item.types.ts";
import {getItem} from "../../../item/item.helpers.ts";

export class LootDataTypeLoot extends LootDataType {
    public type = 'loot'

    public matches(line: string): boolean {
        return line.toLowerCase().includes('loot of') || line.toLowerCase().includes('content of');
    }

    public toValue(line: string): ItemLooted[] {
        const lootString = line.toLowerCase().split(':')[2]
        const lootValues = lootString.split(',')

        return lootValues.map(lootValue => {
            const valueSanitised = this.sanitiseValue(lootValue)
            const [amountString, ...potentialNameString] = valueSanitised.split(' ')

            const hasAnAmount = !isNaN(amountString as any)
            const name = hasAnAmount ? potentialNameString.join(' ') : valueSanitised
            const amount = hasAnAmount ? parseInt(amountString, 10) : 1

            const item = getItem(name)

            return item ? { ...item, amount } : []
        }).flat()
    }

    private sanitiseValue(lootValue: string): string {
        const lootValueTrimmed = lootValue.trim() // Remove white space
        const lootValueWithoutDot = lootValueTrimmed.replace(/\./g, '') // Remove trailing dot

        if (lootValueWithoutDot.startsWith('a ') || lootValueWithoutDot.startsWith('an ')) {
            const [_, ...rest] = lootValueWithoutDot.split(' ')
            return rest.join(' ')
        }

        return lootValueWithoutDot
    }
}

export const lootDataTypeLoot = new LootDataTypeLoot()