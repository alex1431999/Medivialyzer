<script setup lang="ts">
import { VDivider } from 'vuetify/components'
import Members from './Members.vue'
import { Team } from '../stores/teamStore.ts'
import TeamId from './TeamId.vue'
import TeamName from './TeamName.vue'
import ProfitEach from './ProfitEach.vue'
import { computed } from 'vue'
import {
  calcualteTotalLootValue,
  filterLoot,
  groupLoot,
} from '../utils/loot/loot.helpers.ts'
import { useConfigStore } from '../stores/configStore.ts'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import {
  getMembersWithWaste,
  getTotalWaste,
} from '../utils/waste/waste.utils.ts'

const configStore = useConfigStore()
const lootDataStore = useLootDataStore()

const { team } = defineProps<{ team: Team }>()
const emit = defineEmits(['updateName'])

const loot = computed(() => {
  const lootFiltered = filterLoot(
    lootDataStore.lootDataParsed.loot,
    configStore.config,
  )
  return groupLoot(lootFiltered)
})

const profitEach = computed(() => {
  const totalLootValue = calcualteTotalLootValue(loot.value)
  const totalWasteAmount = getTotalWaste(team.wastes)
  const totalProfit = totalLootValue - totalWasteAmount
  const membersWithWasteAmount = getMembersWithWaste(team.wastes).length

  if (membersWithWasteAmount === 0) return null

  return totalProfit / membersWithWasteAmount
})
</script>

<template>
  <div class="d-flex flex-column w-100">
    <TeamId :id="team.id" class="mb-3" />
    <TeamName
      class="mb-3"
      :team="team"
      @update-name="(value) => emit('updateName', value)"
    ></TeamName>
    <v-divider class="mt-2 mb-2" />
    <ProfitEach
      class="ma-2 d-flex justify-center"
      :profit-each="profitEach"
    ></ProfitEach>
    <Members :team="team" :members="team.members || []" />
  </div>
</template>
