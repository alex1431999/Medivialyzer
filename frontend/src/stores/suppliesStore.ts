import { defineStore } from 'pinia';
import { SUPPLIES } from '../utils/supplies/supplies.constants.ts';

export type SuppliesData = Record<
  string,
  { before: number | null; after: number | null }
>;

export type SuppliesStoreData = {
  supplies: SuppliesData;
};

const DEFAULT_SUPPLIES_DATA: SuppliesData = SUPPLIES.reduce(
  (data, supply) => ({ ...data, [supply.name]: { before: null, after: null } }),
  {},
);

const DEFAULT_SUPPLIES_STORE_DATA: SuppliesStoreData = {
  supplies: DEFAULT_SUPPLIES_DATA,
};

export const useSuppliesStore = defineStore('supplies', {
  state: () => {
    return DEFAULT_SUPPLIES_STORE_DATA;
  },
  getters: {
    totalSuppliesUsed: (state) => {
      return SUPPLIES.reduce((total, supply) => {
        const before = state.supplies[supply.name].before;
        const after = state.supplies[supply.name].after;

        // This means the supply either wasn't used or we haven't entered the after value yet
        if (before === null || after === null) return total;

        const amountUsed = before - after;
        const totalSupplyValue = amountUsed * supply.value;

        return total + totalSupplyValue;
      }, 0);
    },
  },
});
