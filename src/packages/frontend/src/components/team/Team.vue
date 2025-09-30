<script setup lang="ts">
import { VDivider } from 'vuetify/components'
import Members from './member/Members.vue'
import { Team } from '../../stores/teamStore.ts'
import TeamId from './TeamId.vue'
import TeamProfitEach from './TeamProfitEach.vue'
import { computed } from 'vue'
import {
  getMembersWithWaste,
  getTotalWaste,
} from '../../utils/waste/waste.utils.ts'
import { useLoot } from '../../composables/useLoot.ts'

const { totalLootValue } = useLoot()

const { team } = defineProps<{ team: Team }>()

const profitEach = computed(() => {
  const totalWasteAmount = getTotalWaste(team.wastes)
  const totalProfit = totalLootValue.value - totalWasteAmount
  const membersWithWasteAmount = getMembersWithWaste(team.wastes).length

  if (membersWithWasteAmount === 0) return null

  return totalProfit / membersWithWasteAmount
})
</script>

<template>
  <div class="d-flex flex-column w-100">
    <TeamId :id="team.id" class="mb-3" />
    <v-divider class="mt-2 mb-2" />
    <TeamProfitEach
      class="ma-2 d-flex justify-center"
      :profit-each="profitEach"
    ></TeamProfitEach>
    <Members :team="team" :members="team.members || []" />
  </div>
</template>
