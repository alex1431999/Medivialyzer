<script setup lang="ts">
import { VDivider, VTextField } from 'vuetify/components'
import Members from './member/Members.vue'
import { Team, useTeamStore } from '../../stores/teamStore.ts'
import TeamId from './TeamId.vue'
import TeamProfit from './TeamProfit.vue'
import { computed } from 'vue'
import {
  getMembersWithWaste,
  getTotalWaste,
} from '../../utils/waste/waste.utils.ts'
import TeamSplitLootModal from './TeamSplitLootModal.vue'
import TeamDoneButton from './TeamDoneButton.vue'
import _ from 'lodash'

const teamStore = useTeamStore()

const { team } = defineProps<{ team: Team }>()

const membersWithWaste = computed(() =>
  getMembersWithWaste(team.wastes, team.resetTimestamp),
)

const hasSplitLoot = computed(() => team.lootAmount !== null)

const profit = computed(() => {
  if (!membersWithWaste.value.length || team.lootAmount === null) return null

  const totalWasteAmount = getTotalWaste(team.wastes, team.resetTimestamp)
  return team.lootAmount - totalWasteAmount
})

const profitEach = computed(() => {
  const membersWithWasteAmount = membersWithWaste.value.length
  if (membersWithWasteAmount === 0 || profit.value === null) return null

  return profit.value / membersWithWasteAmount
})

function onLootAmountChange(value: string) {
  teamStore.update(team.id, { lootAmount: Number(value) })
}

const onLootamountChangeDebounced = _.debounce(onLootAmountChange, 1000)
</script>

<template>
  <div class="d-flex flex-column w-100">
    <TeamId :id="team.id" class="mb-3" />
    <v-divider class="mt-2 mb-2" />
    <div class="d-flex justify-space-between ma-4 align-center">
      <TeamSplitLootModal v-if="!hasSplitLoot" :team="team" />
      <template v-else>
        <TeamDoneButton :team="team" />
        <v-text-field
          v-model="team.lootAmount"
          label="Total Loot"
          type="number"
          density="compact"
          variant="outlined"
          hide-details
          class="total-loot-input"
          color="secondary"
          @update:model-value="onLootamountChangeDebounced"
        />
        <TeamProfit
          v-if="profit !== null && profitEach !== null"
          :profit="profit"
          :profit-each="profitEach"
        ></TeamProfit>
      </template>
    </div>
    <Members
      :team="team"
      :members="team.members"
      :is-split-mode="hasSplitLoot"
    />
  </div>
</template>

<style scoped>
.total-loot-input {
  max-width: 150px;
}
</style>
