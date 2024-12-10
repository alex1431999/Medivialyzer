import {defineStore} from "pinia";
import {electron} from "../utils/electron/electron.constants.ts";

export type Config = {
    since: number
    ignoredItems: string[]
}

const DEFAULT_CONFIG: Config = {
    since: 0,
    ignoredItems: []
}

export const useConfigStore = defineStore('config', {
    state: () => {
        return { config: {...DEFAULT_CONFIG, ...electron.getConfig()} }
    },
    actions: {
        setConfig(config: Partial<Config>) {
            this.config = { ...this.config, ...config }
            electron.setConfig(JSON.stringify(this.config))
        },
        ignoreItem(itemName: string) {
            if (!this.config.ignoredItems.includes(itemName)) {
                this.config.ignoredItems.push(itemName);
                electron.setConfig(JSON.stringify(this.config))
            }
        },
        removeIgnoredItems(itemName: string) {
          const index = this.config.ignoredItems.indexOf(itemName);

          if (index > -1) {
              this.config.ignoredItems.splice(index, 1);
              electron.setConfig(JSON.stringify(this.config))
          }
        }
    }
})