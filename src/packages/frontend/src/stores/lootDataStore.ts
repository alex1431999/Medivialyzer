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
    creaturesCurrentHunt: [],
    creaturesWithAverageLoot: [],
    creaturesWithAverageLootCurrentHunt: [],
  },
  previousOptions: {},
  isParsingLootData: false,
  ongoingParsingCalls: 0,
}

export const useLootDataStore = defineStore('lootData', {
  state: () => ({ ...DEFAULT_DATA }),
  actions: {
    async init() {
      this.lootData = electron.readEntireLootFile()
      await this.parse()

      electron.onLootDataUpdated(async (_: any, newData: string) => {
        this.lootData += newData

        await this.parse()
      })
    },
    async updateOptions(options: LootParserOptions) {
      const hasOptionsChanged = !_.isEqual(options, this.previousOptions)

      if (hasOptionsChanged) {
        this.previousOptions = options || {}

        await this.parse()
      }
    },
    async parse() {
      this.isParsingLootData = true
      this.ongoingParsingCalls += 1

      return runWorkerLootParser(this.lootData, this.previousOptions)
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
    },
  },
})
