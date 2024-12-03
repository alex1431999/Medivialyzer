<script setup lang="ts">
import { defineProps } from 'vue'

import { LootEntry} from "../utils/loot/loot.types.ts";
import { VCard, VCardText } from "vuetify/components/VCard";
import { VChip } from "vuetify/components/VChip";
import { VBadge } from "vuetify/components/VBadge";

const { lootEntry } = defineProps<{ lootEntry: LootEntry }>()

</script>

<template>
  <VCard class="loot-list-item__card">
    <VCardText>
      <VBadge color="primary" :content="`${lootEntry.amount}x`">
        <VChip>
          {{ lootEntry.item.name }}
        </VChip>
      </VBadge>
    </VCardText>
  </VCard>
</template>

<style scoped>
.loot-list-item__card {
  width: 100%;
}
</style>