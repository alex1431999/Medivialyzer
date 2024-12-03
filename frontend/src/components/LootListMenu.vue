<script setup lang="ts">
import { VCard, VCardText } from "vuetify/components/VCard";
import { VBtn, VIcon, VChip } from 'vuetify/components'

const { totalLootValue } = defineProps<{ totalLootValue: number }>()
</script>

<template>
  <v-card class="loot-list-menu__card">
    <v-card-text class="loot-list-menu__card-text">
      <v-btn color="secondary" @click="$emit('reset')">
        Reset hunt
      </v-btn>

      <v-chip color="secondary">
        {{ totalLootValue }}
        <v-icon icon="mdi-gold"></v-icon>
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.loot-list-menu__card {
  width: 100%;
}

.loot-list-menu__card-text {
  display: flex;
  justify-content: space-between;
}
</style>