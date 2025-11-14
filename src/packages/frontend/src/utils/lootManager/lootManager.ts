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

  public itemsLooted: ItemLooted[] = []

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
    this.computeItems(this.creaturesToLootMap)
  }

  public async updateSince(since: number) {
    this.options.since = since
    await this.recompute()
  }

  // TODO if we cache items we also need to recompute them here
  public updateItems(items: Item[]) {
    this.options.items = items
    this.computeItems(this.creaturesToLootMap)
  }

  // TODO we can probably only compute these values once and then cache them and only
  //  recompute if the underlying data changes or the itemsConfiguration changes
  private computeItems(creaturesToLootMap: CreaturesToLootMap) {
    let newItemsLooted: ItemLooted[] = []

    Object.values(creaturesToLootMap).forEach(({ items }) => {
      newItemsLooted = mergeItemsLooted(newItemsLooted, items)
    })

    const newItemsLootedEhanced = newItemsLooted.map((item) => ({
      ...item,
      ...getItem(item.name, this.options.items),
    }))

    this.itemsLooted = mergeItemsLooted(this.itemsLooted, newItemsLootedEhanced)
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

    this.computeItems(creaturesToLooMapToAdd)
  }
}
