import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import {
  LootDataParsed,
  LootParserOptions,
} from '../utils/lootParser/lootParser.ts'
import _ from 'lodash'
import { runWorkerLootParser } from '../workers/worker.utils.ts'

export type LootDataStoreData = {
  lootData: string
  lootDataParsed: LootDataParsed
  previousOptions: LootParserOptions
  isParsingLootData: boolean
  ongoingParsingCalls: number
}

const DEFAULT_DATA: LootDataStoreData = {
  lootData: '',
  lootDataParsed: {
    loot: [],
    creatures: [],
    creaturesWithAverageLoot: [],
  },
  previousOptions: {},
  isParsingLootData: false,
  ongoingParsingCalls: 0,
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
        this.isParsingLootData = true
        this.ongoingParsingCalls += 1

        runWorkerLootParser(lootData, options)
          .then((lootDataParsed) => {
            this.lootDataParsed = lootDataParsed
            this.ongoingParsingCalls -= 1
          })
          .catch((error) => {
            this.ongoingParsingCalls -= 1
            throw error
          })
          .finally(() => {
            if (this.ongoingParsingCalls === 0) {
              this.isParsingLootData = false
            }
          })
      }
    },
  },
})
