export type LootItemName = string

export type Item = {
    name: LootItemName
}

export type Loot = {
    item: LootItemName;
    timestamp: number;
    value: number;
}