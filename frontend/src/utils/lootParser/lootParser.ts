import {lootDataTypeLoot} from "./lootDataType/lootDataTypes/lootDataType.loot.ts";
import {lootDataTypeTimestamp} from "./lootDataType/lootDataTypes/lootDataType.timestamp.ts";
import {ItemLooted} from "../item/item.types.ts";
import {LootEntry} from "../loot/loot.types.ts";

export class LootParser {
    private readonly lootData: string;

    constructor(lootData: string) {
        this.lootData = lootData;
    }

    public getLoot(since: number): LootEntry[] {
        let loot: LootEntry[] = []
        let currentTimeStamp = 0

        this.forEachLine(line => {
            if (lootDataTypeTimestamp.matches(line)) {
                currentTimeStamp = lootDataTypeTimestamp.toValue(line)
            }

            if (lootDataTypeLoot.matches(line) && since < currentTimeStamp) {
                const items: ItemLooted[] = lootDataTypeLoot.toValue(line)
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

    private forEachLine(callback: (line: string) => void) {
        this.lootData.split("\n").forEach(callback)
    }
}
