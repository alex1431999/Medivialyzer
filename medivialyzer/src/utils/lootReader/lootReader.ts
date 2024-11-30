import {lootDataTypeLoot} from "./lootDataType/lootDataTypes/lootDataType.loot.ts";
import {Loot} from "./lootReader.types.ts";
import {lootDataTypeTimestamp} from "./lootDataType/lootDataTypes/lootDataType.timestamp.ts";
import {Item} from "../item/item.types.ts";

export class LootReader {
    private readonly lootData: string;

    constructor(lootData: string) {
        this.lootData = lootData;
    }

    public getLoot(since: number): Loot[] {
        let loot: Loot[] = []
        let currentTimeStamp = 0

        this.forEachLine(line => {
            if (lootDataTypeTimestamp.matches(line)) {
                currentTimeStamp = lootDataTypeTimestamp.toValue(line)
            }

            if (lootDataTypeLoot.matches(line) && since < currentTimeStamp) {
                const items: Item[] = lootDataTypeLoot.toValue(line)
                const lootToAdd = items.map(item => ({
                    item,
                    timestamp: currentTimeStamp,
                    value: 0,
                }))

                loot = loot.concat(lootToAdd)
            }
        })

        return loot
    }

    private forEachLine(callback: (line: string) => void) {
        this.lootData.split("\n").forEach(callback)
    }
}