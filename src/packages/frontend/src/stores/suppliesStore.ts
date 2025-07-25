import { defineStore } from 'pinia'
import { SUPPLIES } from '../utils/supplies/supplies.constants.ts'
import _ from 'lodash'
import { useConfigStore } from './configStore.ts'
import { getSupplyByNameSafe } from '../utils/supplies/supplies.utils.ts'

export type SuppliesData = Record<
  string,
  { before: number | ''; after: number | ''; cost: number }
>

export type SuppliesStoreData = {
  supplies: SuppliesData
}

const DEFAULT_SUPPLIES_DATA: SuppliesData = SUPPLIES.reduce(
  (data, supply) => ({
    ...data,
    [supply.name]: {
      before: null,
      after: null,
      cost: supply.cost,
    },
  }),
  {},
)

export const useSuppliesStore = defineStore('supplies', {
  state: () => {
    const configStore = useConfigStore()

    const storedSupplies: SuppliesData = _.cloneDeep(
      configStore.$state.config.supplies,
    )
    const defaultSupplies = _.cloneDeep(DEFAULT_SUPPLIES_DATA)

    const suppliesEffective =
      Object.keys(storedSupplies).length === Object.keys(defaultSupplies).length
        ? storedSupplies
        : defaultSupplies

    const suppliesEffectiveWithCost = Object.keys(suppliesEffective).reduce(
      (result, supplyName) => {
        const cost = getSupplyByNameSafe(supplyName).cost
        result[supplyName] = { ...suppliesEffective[supplyName], cost }
        return result
      },
      {} as SuppliesData,
    )

    return { supplies: suppliesEffectiveWithCost }
  },
  getters: {
    totalSuppliesUsed: (state) => {
      return SUPPLIES.reduce((total, supply) => {
        const { before, after, cost } = _.get(state.supplies, `${supply.name}`)

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
        const totalSupplyValue = amountUsed * cost

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
