import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import {
  LootDataParsed,
  LootParserOptions,
} from '../utils/lootParser/lootParser.ts'
import _ from 'lodash'
import { runWorkerLootParser } from '../workers/worker.utils.ts'
import { getAllItems } from '../utils/item/item.helpers.ts'

export type LootDataStoreData = {
  lootData: string
  lootDataParsed: LootDataParsed
  previousOptions: LootParserOptions
}

const DEFAULT_DATA: LootDataStoreData = {
  lootData: '',
  lootDataParsed: {
    loot: [],
    creatures: [],
    creaturesWithAverageLoot: [],
  },
  previousOptions: {},
}

export const useLootDataStore = defineStore('lootData', {
  state: () => ({ ...DEFAULT_DATA }),
  actions: {
    update(options?: LootParserOptions) {
      const lootData = electron.getLootData()

      const hasLootDataChanged = lootData !== this.lootData
      const hasOptionsChanged = !_.isEqual(options, this.previousOptions)

      if (hasLootDataChanged || hasOptionsChanged) {
        this.lootData = lootData
        this.previousOptions = options || {}

        runWorkerLootParser(lootData, {
          ...options,
          items: getAllItems(),
        }).then((lootDataParsed) => (this.lootDataParsed = lootDataParsed))
      }
    },
  },
})
