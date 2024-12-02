import {Item} from "../item/item.types.ts";

export type Loot = {
    item: Item;
    timestamp: number;
}

export type LootEntry = {
    item: Item;
    timestamp: number;
    amount: number;
}