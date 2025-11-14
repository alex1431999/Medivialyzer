import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import { LootParserOptions } from '../utils/lootParser/lootParser.ts'
import _ from 'lodash'
import { LootManager } from '../utils/lootManager/lootManager.ts'
import { LootParserV2 } from '../utils/lootParser/lootParser.v2.ts'
import { useConfigStore } from './configStore.ts'

export type LootDataStoreV2Data = {
  lootData: string
  lootManagerGeneral: LootManager
  lootManagerCurrent: LootManager
  previousOptions: LootParserOptions
  isParsingLootData: boolean
  ongoingParsingCalls: number
  lastReadSize: number
  updatePromise: Promise<void>
}

const DEFAULT_DATA: LootDataStoreV2Data = {
  lootData: '',
  lootManagerGeneral: new LootManager(),
  lootManagerCurrent: new LootManager(),
  // TODO we aren't tracking any of these parsing events in the store yet
  previousOptions: {},
  isParsingLootData: false,
  ongoingParsingCalls: 0,
  lastReadSize: 0,
  updatePromise: Promise.resolve(),
}

const lootParser = new LootParserV2()

export const useLootDataStoreV2 = defineStore('lootDataV2', {
  state: () => ({ ...DEFAULT_DATA }),
  actions: {
    async init() {
      await this.startLootDataStream()
    },
    async startLootDataStream() {
      const configStore = useConfigStore()

      this.lootData = ''
      this.lastReadSize = 0

      electron.onLootDataUpdated(
        async (_: any, newData: string, lastReadSize: number) => {
          this.updatePromise = this.updatePromise.then(async () => {
            // Only accept new data
            if (lastReadSize > this.lastReadSize) {
              this.lastReadSize = lastReadSize
              this.lootData += newData

              const currentData = lootParser.getLootDataSince(
                newData,
                configStore.config.since,
              )

              this.lootManagerGeneral.addLootData(newData)
              this.lootManagerCurrent.addLootData(currentData)
            }
          })
        },
      )

      electron.watchLootFile()
      electron.readEntireLootFile()
    },
    // TODO we still might want to make use of options here
    async updateOptions(options: LootParserOptions) {
      const configStore = useConfigStore()
      const hasOptionsChanged = !_.isEqual(options, this.previousOptions)

      if (hasOptionsChanged) {
        this.previousOptions = options || {}

        const currentData = lootParser.getLootDataSince(
          this.lootData,
          configStore.config.since,
        )

        this.lootManagerCurrent.recompute(currentData)
      }
    },
  },
})
