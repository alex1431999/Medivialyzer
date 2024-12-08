<script setup lang="ts">
import { VCard, VCardText } from "vuetify/components/VCard";
import { VIcon, VChip } from 'vuetify/components'
import LootListTimeControl from "./LootListTimeControl.vue";
import SuppliesModal from "./SuppliesModal.vue";

const { totalLootValue } = defineProps<{ totalLootValue: number }>()
</script>

<template>
  <v-card class="loot-list-menu__card">
    <v-card-text class="loot-list-menu__card-text">
      <SuppliesModal />
      <LootListTimeControl @reset="$emit('reset')" @back="$emit('back')" @forward="$emit('forward')" ></LootListTimeControl>

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