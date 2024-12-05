import {defineStore} from "pinia";
import {electron} from "../utils/electron/electron.constants.ts";

export type Config = {
    since: number
}

const DEFAULT_CONFIG: Config = {
    since: 0,
}

export const useConfigStore = defineStore('config', {
    state: () => {
        return { config: electron.getConfig() || DEFAULT_CONFIG }
    },
    actions: {
        setConfig(config: Partial<Config>) {
            this.config = { ...this.config, ...config }
            electron.setConfig(config)
        }
    }
})