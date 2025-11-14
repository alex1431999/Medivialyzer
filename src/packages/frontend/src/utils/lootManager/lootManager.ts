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

export type LootManagerOptions = {
  since: number
  items: Item[]
}

// TODO add all the other helper functions to get different information form the data
/**
 * The loot manager keeps track of the raw loot data and provides information
 * about that data given the options of the loot manager.
 */
export class LootManager {
  private lootParser = new LootParserV2()

  private lootData: string = ''

  private options: LootManagerOptions = { since: 0, items: getAllItems() }

  // TODO: we need to persist this data
  private creaturesToLootMap: CreaturesToLootMap = {}

  /**
   * This function can be called whenever new data has been added to the loot
   * file.
   */
  public async onNewData(newLootData: string) {
    this.lootData += newLootData
    await this.compute(newLootData)
  }

  /**
   * Call this function to fully recompute the entire loot data internally.
   */
  public async recompute() {
    this.creaturesToLootMap = {}
    await this.compute(this.lootData)
  }

  public async updateSince(since: number) {
    this.options.since = since
    await this.recompute()
  }

  // TODO if we cache items we also need to recompute them here
  public updateItems(items: Item[]) {
    this.options.items = items
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

  private async compute(lootData: string) {
    const lootDataFiltered = this.lootParser.getLootDataSince(
      lootData,
      this.options.since,
    )

    const creaturesToLooMapToAdd = await this.lootParser.parse(lootDataFiltered)

    this.creaturesToLootMap = mergeCreaturesToLootMap(
      this.creaturesToLootMap,
      creaturesToLooMapToAdd,
    )
  }
}
