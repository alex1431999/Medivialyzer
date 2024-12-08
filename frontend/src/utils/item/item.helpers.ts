import {Item, ItemName} from "./item.types.ts";
import {ITEMS} from "./item.constants.ts";
import {singularize} from "../string.ts";

export function getItem(itemName: ItemName) {
    return ITEMS.find((item: Item) => {
        const itemNameCurrent = item.name.toLowerCase()
        const itemNameLowerCase = itemName.toLowerCase()
        const itemNameSingular = singularize(itemNameLowerCase)

        return itemNameCurrent === itemNameLowerCase || itemNameCurrent === itemNameSingular
    });
}