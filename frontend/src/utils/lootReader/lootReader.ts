import {lootDataTypeLoot} from "./lootDataType/lootDataTypes/lootDataType.loot.ts";
import {lootDataTypeTimestamp} from "./lootDataType/lootDataTypes/lootDataType.timestamp.ts";
import {Item} from "../item/item.types.ts";
import {Loot} from "../loot/loot.types.ts";

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

//const path = 'D:\\projects\\Medivialyzer/frontend/src/utils/lootReader/Loot.txt'
//const lootData = window.electron.fs.readFileSync(path).toString();
const lootData = "\n" +
    "Channel saved at Wed Nov 27 19:34:52 2024\n" +
    "19:19 Loot of rotworm: ham.\n" +
    "19:19 Loot of rotworm: ham, meat, a bag.\n" +
    "19:19 Content of a bag within the corpse of rotworm: a sword.\n" +
    "19:19 Loot of rotworm: meat, 10 gold coins, a gold coin.\n" +
    "19:34 Loot of rotworm: ham, a bag.\n" +
    "19:34 Content of a bag within the corpse of rotworm: a sword.\n" +
    "\n" +
    "Channel saved at Wed Dec 04 19:29:20 2024\n" +
    "19:14 Loot of giant cobra: 66 gold coins.\n" +
    "19:14 Loot of jaguar: 90 gold coins.\n" +
    "19:14 Loot of jaguar: empty.\n" +
    "19:14 Loot of giant cobra: 27 gold coins.\n" +
    "19:17 Loot of winged vermin: 55 gold coins.\n" +
    "19:18 Loot of giant cobra: 23 gold coins.\n" +
    "19:18 Loot of giant cobra: 18 gold coins.\n" +
    "19:18 Loot of winged vermin: 18 gold coins.\n" +
    "19:19 Loot of giant cobra: 17 gold coins.\n" +
    "19:19 Loot of giant cobra: 9 gold coins.\n" +
    "19:19 Loot of winged vermin: 17 gold coins.\n" +
    "19:19 Loot of giant cobra: 49 gold coins.\n" +
    "19:19 Loot of giant cobra: 31 gold coins.\n" +
    "19:20 Loot of giant cobra: 67 gold coins.\n" +
    "19:20 Loot of giant cobra: 24 gold coins.\n" +
    "19:20 Loot of winged vermin: empty.\n" +
    "19:20 Loot of winged vermin: empty.\n" +
    "19:21 Loot of winged vermin: empty.\n" +
    "19:21 Loot of giant cobra: a gold coin.\n" +
    "19:21 Loot of winged vermin: 88 gold coins.\n" +
    "19:22 Loot of winged vermin: 33 gold coins.\n" +
    "19:22 Loot of winged vermin: 20 gold coins.\n" +
    "19:23 Loot of giant cobra: 65 gold coins.\n" +
    "19:23 Loot of giant cobra: 63 gold coins.\n" +
    "19:23 Loot of giant cobra: 34 gold coins.\n" +
    "\n" +
    "Channel saved at Wed Dec 04 19:35:56 2024\n" +
    "19:24 Loot of giant cobra: 71 gold coins.\n" +
    "19:24 Loot of giant cobra: 5 gold coins.\n" +
    "19:24 Loot of giant cobra: 2 gold coins.\n" +
    "19:24 Loot of giant cobra: 45 gold coins.\n" +
    "19:25 Loot of winged vermin: 55 gold coins.\n" +
    "19:25 Loot of winged vermin: 8 gold coins, a plate armor.\n" +
    "19:25 Loot of winged vermin: 30 gold coins.\n" +
    "19:25 Loot of winged vermin: 36 gold coins.\n" +
    "19:25 Loot of winged vermin: 84 gold coins.\n" +
    "19:26 Loot of giant cobra: ancient boots, 14 gold coins.\n" +
    "19:26 Loot of giant cobra: 39 gold coins.\n" +
    "19:26 Loot of winged vermin: 64 gold coins.\n" +
    "19:26 Loot of giant cobra: 62 gold coins.\n" +
    "19:27 Loot of giant cobra: 6 gold coins.\n" +
    "19:27 Loot of giant cobra: 66 gold coins.\n" +
    "19:27 Loot of giant cobra: 51 gold coins.\n" +
    "19:27 Loot of giant cobra: 69 gold coins.\n" +
    "19:27 Loot of winged vermin: 31 gold coins.\n" +
    "19:27 Loot of winged vermin: empty.\n" +
    "19:28 Loot of winged vermin: 17 gold coins.\n" +
    "19:28 Loot of winged vermin: empty.\n" +
    "19:28 Loot of giant cobra: 24 gold coins.\n" +
    "19:28 Loot of winged vermin: empty.\n" +
    "19:29 Loot of winged vermin: empty.\n" +
    "19:29 Loot of giant cobra: 43 gold coins.\n" +
    "\n" +
    "Channel saved at Wed Dec 04 19:41:27 2024\n" +
    "19:29 Loot of giant cobra: 56 gold coins.\n" +
    "19:30 Loot of giant cobra: 68 gold coins.\n" +
    "19:30 Loot of giant cobra: 32 gold coins.\n" +
    "19:30 Loot of giant cobra: 76 gold coins.\n" +
    "19:31 Loot of giant cobra: 15 gold coins.\n" +
    "19:31 Loot of winged vermin: 24 gold coins.\n" +
    "19:31 Loot of giant cobra: 29 gold coins.\n" +
    "19:31 Loot of winged vermin: 8 gold coins.\n" +
    "19:31 Loot of winged vermin: 18 gold coins.\n" +
    "19:32 Loot of winged vermin: 81 gold coins.\n" +
    "19:32 Loot of giant cobra: 27 gold coins.\n" +
    "19:32 Loot of winged vermin: 62 gold coins.\n" +
    "19:32 Loot of giant cobra: 49 gold coins, 2 silver elite tokens.\n" +
    "19:32 Loot of winged vermin: 43 gold coins.\n" +
    "19:33 Loot of giant cobra: 75 gold coins.\n" +
    "19:33 Loot of giant cobra: 52 gold coins, a bag.\n" +
    "19:33 Loot of giant cobra: 73 gold coins.\n" +
    "19:33 Content of a bag within the corpse of giant cobra: a serpent scepter.\n" +
    "19:33 Loot of giant cobra: 14 gold coins.\n" +
    "19:34 Loot of winged vermin: 56 gold coins.\n" +
    "19:34 Loot of winged vermin: empty.\n" +
    "19:34 Loot of winged vermin: 79 gold coins, a crown helmet.\n" +
    "19:35 Loot of giant cobra: 54 gold coins.\n" +
    "19:35 Loot of winged vermin: empty.\n" +
    "19:35 Loot of giant cobra: 18 gold coins.\n" +
    "\n" +
    "Channel saved at Wed Dec 04 19:45:31 2024\n" +
    "19:36 Loot of winged vermin: 99 gold coins.\n" +
    "19:36 Loot of winged vermin: 10 gold coins.\n" +
    "19:36 Loot of giant cobra: 47 gold coins.\n" +
    "19:36 Loot of giant cobra: 48 gold coins, a silver elite token.\n" +
    "19:37 Loot of giant cobra: 3 small emeralds, 76 gold coins.\n" +
    "19:37 Loot of giant cobra: ancient boots, 26 gold coins.\n" +
    "19:37 Loot of giant cobra: 13 gold coins.\n" +
    "19:37 Loot of giant cobra: 55 gold coins.\n" +
    "19:37 Loot of winged vermin: 48 gold coins.\n" +
    "19:38 Loot of winged vermin: 41 gold coins.\n" +
    "19:38 Loot of winged vermin: 63 gold coins.\n" +
    "19:38 Loot of winged vermin: 97 gold coins, a crown helmet.\n" +
    "19:38 Loot of giant cobra: 61 gold coins.\n" +
    "19:38 Loot of winged vermin: a gold coin.\n" +
    "19:38 Loot of giant cobra: 46 gold coins.\n" +
    "19:39 Loot of giant cobra: 61 gold coins.\n" +
    "19:39 Loot of winged vermin: 23 gold coins.\n" +
    "19:39 Loot of giant cobra: 64 gold coins.\n" +
    "19:39 Loot of giant cobra: a gold coin.\n" +
    "19:40 Loot of giant cobra: 37 gold coins.\n" +
    "19:40 Loot of winged vermin: 95 gold coins.\n" +
    "19:40 Loot of winged vermin: 48 gold coins.\n" +
    "19:40 Loot of winged vermin: 58 gold coins.\n" +
    "19:41 Loot of giant cobra: 48 gold coins.\n" +
    "19:41 Loot of winged vermin: 57 gold coins, a plate armor.\n" +
    "19:41 Loot of giant cobra: 58 gold coins.\n" +
    "19:41 Loot of winged vermin: 50 gold coins, a plate armor.\n" +
    "19:41 Loot of winged vermin: empty.\n" +
    "19:42 Loot of giant cobra: 33 gold coins.\n" +
    "19:42 Loot of giant cobra: 63 gold coins."

export const lootReader = new LootReader(lootData);