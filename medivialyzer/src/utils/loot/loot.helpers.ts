import {Loot, LootEntry} from "./loot.types.ts";

export function groupLoot(loot: Loot[]): LootEntry[] {
    const lootEntryByName: Record<string, LootEntry> = {}

    loot.forEach((lootCurrent: Loot) => {
        const name = lootCurrent.item.name

        if (Object.keys(lootEntryByName).includes(name)) {
            lootEntryByName[name] = { ... lootEntryByName[name], amount: lootEntryByName[name].amount + 1 }
        } else {
            lootEntryByName[name] = { ...lootCurrent, amount: 1 }
        }
    })

    return Object.values(lootEntryByName)
}