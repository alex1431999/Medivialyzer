import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import {
  LootDataParsed,
  LootParser,
  LootParserOptions,
} from '../utils/lootParser/lootParser.ts'
import _ from 'lodash'

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
      const lootParser = new LootParser(lootData)

      const hasLootDataChanged = lootData !== this.lootData
      const hasOptionsChanged = !_.isEqual(options, this.previousOptions)

      if (hasLootDataChanged || hasOptionsChanged) {
        this.lootData = lootData
        this.lootDataParsed = lootParser.parse(options)
        this.previousOptions = options || {}
      }
    },
  },
})
