import {defineStore} from "pinia";

export const useConfigStore = defineStore('config', {
    state: () => {
        return {
            since: 0
        }
    }
})