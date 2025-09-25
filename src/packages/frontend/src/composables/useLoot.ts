import { computed } from 'vue'
import {
  calcualteTotalLootValue,
  filterLoot,
  groupLoot,
} from '../utils/loot/loot.helpers.ts'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import { useConfigStore } from '../stores/configStore.ts'

export function useLoot() {
  const lootDataStore = useLootDataStore()
  const configStore = useConfigStore()

  const loot = computed(() => {
    const lootFiltered = filterLoot(
      lootDataStore.lootDataParsed.loot,
      configStore.config,
    )
    return groupLoot(lootFiltered)
  })

  const totalLootValue = computed(() => calcualteTotalLootValue(loot.value))

  return {
    loot,
    totalLootValue,
  }
}
