import {LootDataType} from "../lootDataType.ts";
import {Item} from "../../lootReader.types.ts";

export class LootDataTypeLoot extends LootDataType {
    public type = 'loot'

    public matches(line: string): boolean {
        return line.toLowerCase().includes('loot of') || line.toLowerCase().includes('content of');
    }

    public toValue(line: string): Item[] {
        const lootString = line.toLowerCase().split(':')[2]
        const lootValues = lootString.split(',')

        return lootValues.map(value => ({
            name: value,
        }))
    }
}

export const lootDataTypeLoot = new LootDataTypeLoot()