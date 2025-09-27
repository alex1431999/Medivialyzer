<script setup lang="ts">
import { VCard, VCardText } from 'vuetify/components/VCard'
import LootListTimeControl from './LootListTimeControl.vue'
import SuppliesModal from './SuppliesModal.vue'
import LootTotalValueDisplay from './LootTotalValueDisplay.vue'
import CreaturesKilledModal from './CreaturesKilledModal.vue'
import TeamModal from './TeamModal.vue'

const { totalLootValue } = defineProps<{ totalLootValue: number }>()
</script>

<template>
  <v-card class="loot-list-menu__card">
    <v-card-text class="loot-list-menu__card-text">
      <div class="d-flex ga-3">
        <SuppliesModal />
        <CreaturesKilledModal />
        <TeamModal />
      </div>
      <LootListTimeControl
        @reset="$emit('reset')"
        @back="$emit('back')"
        @forward="$emit('forward')"
      ></LootListTimeControl>
      <LootTotalValueDisplay :total-loot-value="totalLootValue" />
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
