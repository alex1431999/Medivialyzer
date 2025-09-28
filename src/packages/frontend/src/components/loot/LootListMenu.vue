<script setup lang="ts">
import { VCard, VCardText } from 'vuetify/components/VCard'
import LootListTimeControl from './LootListTimeControl.vue'
import SuppliesModal from '../supplies/SuppliesModal.vue'
import LootTotalValueDisplay from './LootTotalValueDisplay.vue'
import CreaturesKilledModal from '../creatures/CreaturesKilledModal.vue'
import TeamModal from '../team/TeamModal.vue'
import Settings from '../settings/Settings.vue'

const { totalLootValue } = defineProps<{ totalLootValue: number }>()
</script>

<template>
  <v-card class="loot-list-menu__card">
    <v-card-text class="loot-list-menu__card-text">
      <div class="d-flex ga-3" style="width: 150px">
        <Settings />
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
