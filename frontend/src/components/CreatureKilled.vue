<script setup lang="ts">
import { CreatureGrouped } from '../utils/creature/creature.types.ts'
import { VChip, VBadge, VCard, VCardText } from 'vuetify/components'

const { creature } = defineProps<{ creature: CreatureGrouped }>()
</script>

<template>
  <v-card>
    <v-card-text>
      <v-badge color="secondary" :content="`${creature.amount}x`">
        <v-chip>
          {{ creature.name }}
        </v-chip>
      </v-badge>
    </v-card-text>
  </v-card>
</template>
