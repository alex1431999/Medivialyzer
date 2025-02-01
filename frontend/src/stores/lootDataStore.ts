import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'

export type LootDataStoreData = {
  lootData: string
}

export const useLootDataStore = defineStore('lootData', {
  state: () => ({ lootData: electron.getLootData() }),
  actions: {
    update() {
      this.lootData = electron.getLootData()
    },
  },
})
