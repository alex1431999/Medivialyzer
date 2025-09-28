import { defineStore } from 'pinia'
import { electron } from '../utils/electron/electron.constants.ts'
import { Item } from '../utils/item/item.types.ts'
import _ from 'lodash'
import { SuppliesData, SuppliesFavorites } from './suppliesStore.ts'
import { VocationIdentifier } from '../types/vocation.types.ts'
import { generateId } from '../utils/string.ts'

export type Config = {
  clientId: string
  since: number
  ignoredItems: string[]
  customItems: Item[]
  ignoreItemsWithNoValue: boolean
  consentToSubmitItem: boolean
  restartHintAcknowledged: boolean
  lootFilePath?: string
  skipVersionUpgrade?: string
  supplies?: SuppliesData
  suppliesFavorites?: SuppliesFavorites
  supplyFilter: {
    vocationSelected: VocationIdentifier
  }
}

const DEFAULT_CONFIG: Config = {
  clientId: generateId(),
  since: 0,
  ignoredItems: [],
  customItems: [],
  ignoreItemsWithNoValue: false,
  consentToSubmitItem: false,
  restartHintAcknowledged: false,
  supplies: {},
  suppliesFavorites: {},
  supplyFilter: {
    vocationSelected: 'KNIGHT',
  },
}

export const useConfigStore = defineStore('config', {
  state: () => {
    return { config: { ...DEFAULT_CONFIG, ...electron.getConfig() } }
  },
  actions: {
    onBoot() {
      // Store default values when the client boots
      this.setConfig({})
    },
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
      // We remove an existing item since items can be overwritten multiple
      // times and we only want to save the last time it was overwritten
      const index = this.config.customItems.findIndex(
        (itemCurrent: Item) => itemCurrent.name === item.name,
      )

      if (index > -1) {
        this.config.customItems.splice(index, 1)
      }

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
    setSupplies(supplies: SuppliesData) {
      this.config.supplies = supplies
      electron.setConfig(JSON.stringify(this.config))
    },
  },
})
