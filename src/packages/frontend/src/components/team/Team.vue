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
import TeamSplitLootModal from './TeamSplitLootModal.vue'
import TeamDoneButton from './TeamDoneButton.vue'

const { totalLootValue } = useLoot()

const { team } = defineProps<{ team: Team }>()

const membersWithWaste = computed(() => getMembersWithWaste(team.wastes, team.resetTimestamp))

const hasSplitLoot = computed(() => team.lootAmount !== null)

const profit = computed(() => {
  if (!membersWithWaste.value.length) return null

  const totalWasteAmount = getTotalWaste(team.wastes, team.resetTimestamp)
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
    <div class="d-flex justify-space-between ma-4">
      <TeamSplitLootModal v-if="!hasSplitLoot" :team="team" />
      <template v-else>
        <TeamDoneButton :team="team" />
        <TeamProfit :profit="profit" :profit-each="profitEach"></TeamProfit>
      </template>
    </div>
    <Members :team="team" :members="team.members || []" />
  </div>
</template>
