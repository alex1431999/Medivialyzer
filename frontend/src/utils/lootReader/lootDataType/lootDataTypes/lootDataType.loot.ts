import {LootDataType} from "../lootDataType.ts";
import * as _ from 'lodash'

import {Item} from "../../../item/item.types.ts";
import {getItem} from "../../../item/item.helpers.ts";

export class LootDataTypeLoot extends LootDataType {
    public type = 'loot'

    public matches(line: string): boolean {
        return line.toLowerCase().includes('loot of') || line.toLowerCase().includes('content of');
    }

    public toValue(line: string): Item[] {
        const lootString = line.toLowerCase().split(':')[2]
        const lootValues = lootString.split(',')

        return lootValues.map(value => {
            const valueTrimmed = value.trim().replace(/\./g, '')
            const [amountString, ...potentialNameString] = valueTrimmed.split(' ')

            const hasAnAmount = !isNaN(amountString as any)
            const name = hasAnAmount ? potentialNameString.join(' ') : valueTrimmed
            const amount = hasAnAmount ? parseInt(amountString, 10) : 1

            const item = getItem(name)

            return item ? _.times(amount, () => item) : []
        }).flat()
    }
}

export const lootDataTypeLoot = new LootDataTypeLoot()