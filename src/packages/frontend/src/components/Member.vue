<script setup lang="ts">
import { VCard, VCardText, VBadge, VChip } from 'vuetify/components'
import { Member, Team } from '../stores/teamStore.ts'
import { Client, useClientStore } from '../stores/clientStore.ts'
import Waste from './Waste.vue'
import { computed } from 'vue'
import Payout from './Payout.vue'
import { WasteDto } from '../utils/generated/api-client'
import {
  calcualteTotalLootValue,
  filterLoot,
  groupLoot,
} from '../utils/loot/loot.helpers.ts'
import { useLootDataStore } from '../stores/lootDataStore.ts'
import { useConfigStore } from '../stores/configStore.ts'
import {
  calculateMemberPayout,
  getMemberWaste,
} from '../utils/waste/waste.utils.ts'

const clientStore = useClientStore()
const configStore = useConfigStore()
const lootDataStore = useLootDataStore()

const { member, team } = defineProps<{
  member: Member | Client
  team: Team
  waste?: WasteDto
}>()

const loot = computed(() => {
  const lootFiltered = filterLoot(
    lootDataStore.lootDataParsed.loot,
    configStore.config,
  )
  return groupLoot(lootFiltered)
})

const totalLootValue = computed(() => calcualteTotalLootValue(loot.value))

const isYou = computed(() => clientStore.client?.id === member.id)
const waste = computed(() => getMemberWaste(member.id, team.wastes))
const payout = computed(() =>
  calculateMemberPayout(member.id, team.wastes, totalLootValue.value),
)
</script>

<template>
  <v-card elevation="2" variant="outlined" rounded>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <v-chip v-if="!isYou"> {{ member.name }}</v-chip>
        <v-badge v-else color="secondary" content="You">
          <v-chip>
            {{ member.name }}
          </v-chip>
        </v-badge>

        <div class="d-flex ga-2">
          <Waste :waste="waste" />
          <Payout :payout="payout"></Payout>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
