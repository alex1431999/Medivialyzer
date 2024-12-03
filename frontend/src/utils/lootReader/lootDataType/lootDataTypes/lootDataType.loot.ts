import {LootDataType} from "../lootDataType.ts";

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

        return lootValues.map(value => getItem(value.trim())).filter(item => item !== undefined)
    }
}

export const lootDataTypeLoot = new LootDataTypeLoot()