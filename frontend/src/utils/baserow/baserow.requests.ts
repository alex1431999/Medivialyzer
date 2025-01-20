import { Item } from '../item/item.types.ts'

export function baserowSubmitItem(item: Item, isEdit: boolean) {
  const url =
    'https://api.baserow.io/api/database/views/form/6SG9rcE5kunuC5IuxodLoO3VjwEDdwsDsyoOf7GhP3I/submit/'
  const payload = {
    field_3170716: item.name,
    field_3170717: item.value,
    field_3173341: (item.NPCs || [])[0],
    field_3310678: isEdit,
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
