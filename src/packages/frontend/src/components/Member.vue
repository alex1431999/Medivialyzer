<script setup lang="ts">
import { VCard, VCardText, VBadge, VChip } from 'vuetify/components'
import { Member, Team, useTeamStore } from '../stores/teamStore.ts'
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
import MemberMenu from './MemberMenu.vue'
import { useNotifications } from '../composables/useNotifications.ts'

const clientStore = useClientStore()
const configStore = useConfigStore()
const lootDataStore = useLootDataStore()
const teamStore = useTeamStore()
const { notify } = useNotifications()

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
const isClientOwner = computed(() => clientStore.client?.id === team.owner.id)
const waste = computed(() => getMemberWaste(member.id, team.wastes))
const payout = computed(() =>
  calculateMemberPayout(member.id, team.wastes, totalLootValue.value),
)
const canRemoveMember = computed(() => isClientOwner.value && !isYou.value)

async function removeMember() {
  if (canRemoveMember.value) {
    await teamStore.removeMember(team.id, member.id)
    notify('Member has been removed', 'success')
  }
}
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

        <div class="d-flex ga-2 align-center">
          <Waste :waste="waste" />
          <Payout :payout="payout"></Payout>
          <MemberMenu :can-remove="canRemoveMember" @remove="removeMember" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
