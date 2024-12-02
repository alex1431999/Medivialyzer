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

//const path = 'D:\\projects\\Medivialyzer/medivialyzer/src/utils/lootReader/Loot.txt'
//const lootData = window.electron.fs.readFileSync(path).toString();
const lootData = "\n" +
    "Channel saved at Wed Nov 27 19:34:52 2024\n" +
    "19:19 Loot of rotworm: ham.\n" +
    "19:19 Loot of rotworm: ham, meat, a bag.\n" +
    "19:19 Content of a bag within the corpse of rotworm: a sword.\n" +
    "19:19 Loot of rotworm: meat, 10 gold coins, a gold coin.\n" +
    "19:34 Loot of rotworm: ham, a bag.\n" +
    "19:34 Content of a bag within the corpse of rotworm: a sword."

export const lootReader = new LootReader(lootData);