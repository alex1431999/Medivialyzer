import {
  CreaturesToLootMap,
  LootParserV2,
} from '../lootParser/lootParser.v2.ts'
import {
  mergeCreaturesToLootMap,
  mergeItemsLooted,
} from '../lootParser/lootParser.helpers.ts'
import { Item, ItemLooted } from '../item/item.types.ts'
import { getAllItems, getItem } from '../item/item.helpers.ts'

// TODO add all the other helper functions to get different information form the data
export class LootManager {
  private lootParser = new LootParserV2()

  // TODO: we need to persist this data
  private creaturesToLootMap: CreaturesToLootMap = {}

  public addLootData(lootData: string) {
    const creaturesToLooMapToAdd = this.lootParser.parse(lootData)
    this.creaturesToLootMap = mergeCreaturesToLootMap(
      this.creaturesToLootMap,
      creaturesToLooMapToAdd,
    )
  }

  // TODO we can probably only compute these values once and then cache them and only
  //  recompute if the underlying data changes or the itemsConfiguration changes
  public getItems(itemsConfiguration?: Item[]): ItemLooted[] {
    const allItems = itemsConfiguration || getAllItems()
    let allItemsLooted: ItemLooted[] = []

    Object.values(this.creaturesToLootMap).forEach(({ items }) => {
      allItemsLooted = mergeItemsLooted(allItemsLooted, items)
    })

    return allItemsLooted.map((item) => ({
      ...item,
      ...getItem(item.name, allItems),
    }))
  }
}
