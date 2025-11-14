import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import { LootParserOptions } from '../utils/lootParser/lootParser.ts'
import { LootManager } from '../utils/lootManager/lootManager.ts'

export type LootDataStoreV2Data = {
  lootManagerGeneral: LootManager
  lootManagerCurrent: LootManager
  previousOptions: LootParserOptions
  isParsingLootData: boolean
  ongoingParsingCalls: number
  lastReadSize: number
  updatePromise: Promise<void>
}

const DEFAULT_DATA: LootDataStoreV2Data = {
  lootManagerGeneral: new LootManager(),
  lootManagerCurrent: new LootManager(),
  // TODO we aren't tracking any of these parsing events in the store yet
  previousOptions: {},
  isParsingLootData: false,
  ongoingParsingCalls: 0,
  lastReadSize: 0,
  updatePromise: Promise.resolve(),
}

export const useLootDataStoreV2 = defineStore('lootDataV2', {
  state: () => ({ ...DEFAULT_DATA }),
  actions: {
    async init() {
      await this.startLootDataStream()
    },
    async startLootDataStream() {
      this.lastReadSize = 0

      electron.onLootDataUpdated(
        async (_: any, newData: string, lastReadSize: number) => {
          this.updatePromise = this.updatePromise.then(async () => {
            // Only accept new data
            if (lastReadSize > this.lastReadSize) {
              this.lastReadSize = lastReadSize
              this.lootManagerGeneral.onNewData(newData)
              this.lootManagerCurrent.onNewData(newData)
            }
          })
        },
      )

      electron.watchLootFile()
      electron.readEntireLootFile()
    },
  },
})
