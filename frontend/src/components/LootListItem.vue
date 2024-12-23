<script setup lang="ts">
import {computed, defineProps} from 'vue'

import { LootEntry} from "../utils/loot/loot.types.ts";
import { VCard, VCardText, VMenu, VList, VListItem } from "vuetify/components";
import { VChip } from "vuetify/components/VChip";
import { VBadge } from "vuetify/components/VBadge";
import { VIcon } from "vuetify/components/VIcon";

const emit = defineEmits(['click', 'ignore'])

const { lootEntry } = defineProps<{ lootEntry: LootEntry }>()

const isUnknownItem = computed(() => lootEntry.item.value === undefined)

const totalValue = computed(() =>
    (lootEntry.item.value || 0) * lootEntry.amount
)

const valueColor = computed(() => isUnknownItem.value ? 'warning': 'secondary')

function onClick() {
  emit('click')
}

</script>

<template>
  <VCard class="loot-list-item__card" v-on="isUnknownItem ? { click: onClick } : {}">
    <VCardText class="loot-list-item__text">
      <div class="loot-list-item__name">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-dots-vertical"></v-icon>
          </template>
          <v-list>
            <v-list-item class="loot-list-item__menu" @click="$emit('ignore', lootEntry.item.name)">
              Ignore item
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Item name -->
        <v-badge color="secondary" :content="`${lootEntry.amount}x`">
          <v-chip>
            {{ lootEntry.item.name }}
          </v-chip>
        </v-badge>

      </div>

      <!-- Total value -->
      <v-chip :color="valueColor">
        <template v-if="isUnknownItem">
          unknown
        </template>
        <template v-else>
          {{ totalValue }}
        </template>
        <v-icon icon="mdi-gold" />
      </v-chip>
    </VCardText>
  </VCard>
</template>

<style scoped>
.loot-list-item__card {
  width: 100%;
}

.loot-list-item__name {
  display: flex;
  gap: 10px;
  align-items: center;
}

.loot-list-item__menu {
  overflow: hidden;
}

.loot-list-item__text {
  display: flex;
  justify-content: space-between;
}
</style>