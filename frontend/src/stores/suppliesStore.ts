import { defineStore } from 'pinia'
import { SUPPLIES } from '../utils/supplies/supplies.constants.ts'
import _ from 'lodash'
import { useConfigStore } from './configStore.ts'

export type SuppliesData = Record<
  string,
  { before: number | ''; after: number | '' }
>

export type SuppliesStoreData = {
  supplies: SuppliesData
}

const DEFAULT_SUPPLIES_DATA: SuppliesData = SUPPLIES.reduce(
  (data, supply) => ({ ...data, [supply.name]: { before: null, after: null } }),
  {},
)

export const useSuppliesStore = defineStore('supplies', {
  state: () => {
    const configStore = useConfigStore()

    const storedSupplies = _.cloneDeep(configStore.$state.config.supplies)
    const defaultSupplies = _.cloneDeep(DEFAULT_SUPPLIES_DATA)

    const suppliesEffective =
      Object.keys(storedSupplies).length > 0 ? storedSupplies : defaultSupplies

    return { supplies: suppliesEffective }
  },
  getters: {
    totalSuppliesUsed: (state) => {
      return SUPPLIES.reduce((total, supply) => {
        const before = _.get(state.supplies, `${supply.name}.before`)
        const after = _.get(state.supplies, `${supply.name}.after`)

        // This means the supply either wasn't used or we haven't entered the after value yet
        if (
          before === undefined ||
          after === undefined ||
          before === null ||
          after === null ||
          before === '' ||
          after === ''
        )
          return total

        const amountUsed = before - after
        const totalSupplyValue = amountUsed * supply.value

        return total + totalSupplyValue
      }, 0)
    },
  },
  actions: {
    reset() {
      this.supplies = _.cloneDeep(DEFAULT_SUPPLIES_DATA)
    },
  },
})
