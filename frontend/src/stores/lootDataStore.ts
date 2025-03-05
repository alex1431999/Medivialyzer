import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import {
  LootDataParsed,
  LootParser,
  LootParserOptions,
} from '../utils/lootParser/lootParser.ts'

export type LootDataStoreData = {
  lootData: string
  lootDataParsed: LootDataParsed
}

const DEFAULT_DATA: LootDataStoreData = {
  lootData: electron.getLootData(),
  lootDataParsed: {
    loot: [],
    creatures: [],
    creaturesWithAverageLoot: [],
  },
}

export const useLootDataStore = defineStore('lootData', {
  state: () => ({ ...DEFAULT_DATA }),
  actions: {
    update(options?: LootParserOptions) {
      const lootData = electron.getLootData()
      const lootParser = new LootParser(lootData)

      this.lootData = lootData
      this.lootDataParsed = lootParser.parse(options)
    },
  },
})
