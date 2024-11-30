import {Item} from "../item/item.types.ts";

export type Loot = {
    item: Item;
    timestamp: number;
    value: number;
}