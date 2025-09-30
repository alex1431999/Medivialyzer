<script setup lang="ts">
import { VDivider } from 'vuetify/components'
import Members from './member/Members.vue'
import { Team } from '../../stores/teamStore.ts'
import TeamId from './TeamId.vue'
import TeamProfit from './TeamProfit.vue'
import { computed } from 'vue'
import {
  getMembersWithWaste,
  getTotalWaste,
} from '../../utils/waste/waste.utils.ts'
import { useLoot } from '../../composables/useLoot.ts'

const { totalLootValue } = useLoot()

const { team } = defineProps<{ team: Team }>()

const membersWithWaste = computed(() => getMembersWithWaste(team.wastes))

const profit = computed(() => {
  if (!membersWithWaste.value.length) return null

  const totalWasteAmount = getTotalWaste(team.wastes)
  return totalLootValue.value - totalWasteAmount
})

const profitEach = computed(() => {
  const membersWithWasteAmount = membersWithWaste.value.length
  if (membersWithWasteAmount === 0 || profit.value === null) return null

  return profit.value / membersWithWasteAmount
})
</script>

<template>
  <div class="d-flex flex-column w-100">
    <TeamId :id="team.id" class="mb-3" />
    <v-divider class="mt-2 mb-2" />
    <TeamProfit
      class="ma-2"
      :profit="profit"
      :profit-each="profitEach"
    ></TeamProfit>
    <Members :team="team" :members="team.members || []" />
  </div>
</template>
