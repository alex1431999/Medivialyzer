import {defineStore} from "pinia";
import {electron} from "../utils/electron/electron.constants.ts";

export type Config = {
    since: number
}

export const useConfigStore = defineStore('config', {
    state: () => {
        return { config: electron.getConfig() }
    },
    actions: {
        setConfig(config: Partial<Config>) {
            this.config = { ...this.config, ...config }
            electron.setConfig(config)
        }
    }
})