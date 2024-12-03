<script setup lang="ts">
import { defineProps } from 'vue'

import { LootEntry} from "../utils/loot/loot.types.ts";
import { VCard, VCardText } from "vuetify/components/VCard";

const { lootEntry } = defineProps<{ lootEntry: LootEntry }>()

</script>

<template>
  <VCard class="loot-list-item__card">
    <VCardText>
      {{ lootEntry.item.name }}
      {{ lootEntry.amount }}
    </VCardText>
  </VCard>
</template>

<style scoped>
.loot-list-item__card {
  width: 100%;
}
</style>