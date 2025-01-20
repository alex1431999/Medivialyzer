import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import { Item } from '../utils/item/item.types.ts'
import _ from 'lodash'

export type Config = {
  since: number
  ignoredItems: string[]
  customItems: Item[]
  ignoreItemsWithNoValue: boolean
  consentToSubmitItem: boolean
  lootFilePath?: string
}

const DEFAULT_CONFIG: Config = {
  since: 0,
  ignoredItems: [],
  customItems: [],
  ignoreItemsWithNoValue: false,
  consentToSubmitItem: false,
}

export const useConfigStore = defineStore('config', {
  state: () => {
    return { config: { ...DEFAULT_CONFIG, ...electron.getConfig() } }
  },
  actions: {
    setConfig(config: Partial<Config>) {
      this.config = { ...this.config, ...config }
      electron.setConfig(JSON.stringify(this.config))
    },
    addIgnoredItem(itemName: string) {
      if (!this.config.ignoredItems.includes(itemName)) {
        this.config.ignoredItems.push(itemName)
        electron.setConfig(JSON.stringify(this.config))
      }
    },
    removeIgnoredItems(itemName: string) {
      const index = this.config.ignoredItems.indexOf(itemName)

      if (index > -1) {
        this.config.ignoredItems.splice(index, 1)
        electron.setConfig(JSON.stringify(this.config))
      }
    },
    addCustomItem(item: Item) {
      // TODO if custom item already exists in array, overwrite the existing item
      this.config.customItems.push(item)
      electron.setConfig(JSON.stringify(this.config))
    },
    removeCustomItem(item: Item) {
      _.remove(this.config.customItems, item)
      electron.setConfig(JSON.stringify(this.config))
    },
    setConsentToSubmitItem(consent: boolean) {
      this.config.consentToSubmitItem = consent
      electron.setConfig(JSON.stringify(this.config))
    },
    setLootFilePath(lootFilePath: string) {
      this.config.lootFilePath = lootFilePath
      electron.setConfig(JSON.stringify(this.config))
    },
  },
})
