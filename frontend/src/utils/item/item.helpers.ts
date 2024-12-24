import {Item, ItemName} from "./item.types.ts";
import {ITEMS} from "./item.constants.ts";
import {useConfigStore} from "../../stores/configStore.ts";

export function getAllItems() {
    const configStore = useConfigStore()

    return [...ITEMS, ...configStore.config.customItems]
}

export function getItem(itemName: ItemName) {
    const allItems = getAllItems()
    
    return allItems.find((item: Item) => {
        const itemNameCurrent = item.name.toLowerCase()
        return itemNameCurrent === itemName || itemNameCurrent === itemName
    });
}