<script setup lang="ts">
import { VCard, VCardText, VBadge, VChip } from 'vuetify/components'
import { Member } from '../stores/teamStore.ts'
import { Client, useClientStore } from '../stores/clientStore.ts'
import Waste from './Waste.vue'
import { computed } from 'vue'
import Profit from './Profit.vue'
import { WasteDto } from '../utils/generated/api-client'

const clientStore = useClientStore()

const { member, waste, profitAmount } = defineProps<{
  member: Member | Client
  waste?: WasteDto
  profitAmount?: number
}>()

const isYou = computed(() => clientStore.client?.id === member.id)
</script>

<template>
  <v-card elevation="2" variant="outlined" rounded>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <v-badge v-if="!isYou"> {{ member.name }}</v-badge>
        <v-badge v-else color="secondary" content="You">
          <v-chip>
            {{ member.name }}
          </v-chip>
        </v-badge>

        <div class="d-flex ga-2">
          <Waste :waste="waste" />

          <!-- TODO: we still need to calcualte the profit -->
          <Profit :profit-amount="profitAmount"></Profit>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
