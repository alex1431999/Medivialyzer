import { Item, ItemName } from './item.types.ts'
import { ITEMS } from './item.constants.ts'
import { useConfigStore } from '../../stores/configStore.ts'
import { singularize } from '../string.ts'

export function getAllItems() {
  const configStore = useConfigStore()

  // We insert the custom items first to make sure that custom items always
  // overrule the defined items in case somebody is doing a search over this
  // data.
  return [...configStore.config.customItems, ...ITEMS]
}

export function getItem(itemName: ItemName, items?: Item[]) {
  const allItems = items || getAllItems()
  const itemNameSingularised = singularize(itemName)

  return allItems.find((item: Item) => {
    const itemNameCurrent = item.name.toLowerCase()
    return (
      itemNameCurrent === itemName || itemNameCurrent === itemNameSingularised
    )
  })
}
