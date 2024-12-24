import {Item} from "../item/item.types.ts";

export function baserowSubmitItem(item: Item) {
    const url = 'https://api.baserow.io/api/database/views/form/6SG9rcE5kunuC5IuxodLoO3VjwEDdwsDsyoOf7GhP3I/submit/'
    const payload = {
        field_3170716: item.name,
        field_3170717: item.value
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}