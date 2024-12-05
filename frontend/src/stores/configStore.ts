import {defineStore} from "pinia";

export type Config = {
    since: number
}

export const useConfigStore = defineStore('config', {
    state: () => {
        return {
            config: {
                since: 0
            }
        }
    },
    actions: {
        setConfig(config: Partial<Config>) {
            this.config = { ...this.config, ...config }
        }
    }
})