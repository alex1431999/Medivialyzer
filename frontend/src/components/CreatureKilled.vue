<script setup lang="ts">
import { Creature } from '../utils/creature/creature.types.ts'
import { VChip, VBadge, VCard, VCardText } from 'vuetify/components'

const { creature } = defineProps<{ creature: Creature }>()
</script>

<template>
  <v-card>
    <v-card-text>
      <v-badge color="secondary" :content="'1x'">
        <v-chip>
          {{ creature.name }}
        </v-chip>
      </v-badge>
    </v-card-text>
  </v-card>
</template>
