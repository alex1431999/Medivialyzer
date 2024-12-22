import {defineStore} from "pinia";
import {SUPPLIES} from "../utils/supplies/supplies.constants.ts";

export type SuppliesData = Record<string, { before: number | null, after: number | null }>

export type SuppliesStoreData = {
    supplies: SuppliesData
}

const DEFAULT_SUPPLIES_DATA: SuppliesData = SUPPLIES.reduce((data, supply) => ({ ...data, [supply.name]: { before: null, after: null } }) ,{})

const DEFAULT_SUPPLIES_STORE_DATA: SuppliesStoreData = {
    supplies: DEFAULT_SUPPLIES_DATA
}

export const useSuppliesStore = defineStore('supplies', {
    state: () => {
        return DEFAULT_SUPPLIES_STORE_DATA
    },
})