import { defineStore } from 'pinia'
import { SUPPLIES } from '../utils/supplies/supplies.constants.ts'
import _ from 'lodash'
import { useConfigStore } from './configStore.ts'
import { getSupplyByNameSafe } from '../utils/supplies/supplies.utils.ts'
import { VocationIdentifier } from '../types/vocation.types.ts'

export type SuppliesData = Record<
  string,
  { before: number | ''; after: number | ''; cost: number }
>

export type SuppliesFavorites = Partial<
  Record<VocationIdentifier, Record<string, boolean>>
>

export type SuppliesStoreData = {
  supplies: SuppliesData
}

/**
 * This function makes sure you always have all supplies in your supply data list.
 */
function fillMissingSupplies(suppliesData: SuppliesData) {
  const suppliesDataCopy = _.cloneDeep(suppliesData)

  SUPPLIES.forEach((supply) => {
    if (!Object.keys(suppliesDataCopy).includes(supply.name)) {
      suppliesDataCopy[supply.name] = {
        before: '',
        after: '',
        cost: supply.cost,
      }
    }
  })

  return suppliesDataCopy
}

export const useSuppliesStore = defineStore('supplies', {
  state: (): SuppliesStoreData => {
    const configStore = useConfigStore()

    const storedSupplies: SuppliesData = _.cloneDeep(
      configStore.$state.config.supplies,
    )

    const suppliesEffective = fillMissingSupplies(storedSupplies)

    const suppliesEffectiveWithCost = Object.keys(suppliesEffective).reduce(
      (result, supplyName) => {
        const cost =
          suppliesEffective[supplyName].cost ||
          getSupplyByNameSafe(supplyName).cost
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
        const { before, after, cost } = _.get(
          state.supplies,
          `${supply.name}`,
          { before: null, after: null, cost: null },
        )

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
      Object.values(this.supplies).forEach((supply) => {
        supply.before = ''
        supply.after = ''
      })
    },
  },
})
