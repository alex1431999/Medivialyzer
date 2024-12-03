import {Item, ItemName} from "./item.types.ts";
import {items} from "./item.constants.ts";

export function getItem(itemName: ItemName) {
    return items.find((item: Item) => item.name === itemName);
}