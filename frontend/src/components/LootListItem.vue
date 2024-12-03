<script setup lang="ts">
import {computed, defineProps} from 'vue'

import { LootEntry} from "../utils/loot/loot.types.ts";
import { VCard, VCardText } from "vuetify/components/VCard";
import { VCard, VCardText } from "vuetify/components/VCard";
import { VChip } from "vuetify/components/VChip";
import { VChip } from "vuetify/components/VChip";
import { VBadge } from "vuetify/components/VBadge";
import { VBadge } from "vuetify/components/VBadge";
import { VIcon, VBtn } from "vuetify/components";
import { VIcon } from "vuetify/components/VIcon";

const emit = defineEmits(['ignoreItem'])
const { lootEntry } = defineProps<{ lootEntry: LootEntry }>()

const totalValue = computed(() =>
  lootEntry.item.value * lootEntry.amount

const ignoreItem = () => {
  emit('ignoreItem', lootEntry.item)
}
)

</script>

<template>
  <VCard class="loot-list-item__card">
    <VCardText class="loot-list-item__text">
      <!-- Item name -->
      <v-badge color="secondary" :content="`${lootEntry.amount}x`">
        <v-chip>
          {{ lootEntry.item.name }}
        </v-chip>
      </v-badge>

      <!-- Total value -->
      <v-chip color="secondary">
        {{ totalValue }}
        <v-icon icon="mdi-gold">
        </v-icon>
      </v-chip>
      <v-btn icon="mdi-eye-off" size="small" @click="ignoreItem"></v-btn>
    </VCardText>
  </VCard>
</template>

<style scoped>
.loot-list-item__card {
  width: 100%;
}

.loot-list-item__text {
  display: flex;
  justify-content: space-between;
}
</style>