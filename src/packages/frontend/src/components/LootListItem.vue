<script setup lang="ts">
import { computed, defineProps } from 'vue'

import { LootEntry } from '../utils/loot/loot.types.ts'
import { VCard, VCardText, VTooltip } from 'vuetify/components'
import { VChip } from 'vuetify/components/VChip'
import { VBadge } from 'vuetify/components/VBadge'
import { VIcon } from 'vuetify/components/VIcon'
import { getNPC } from '../utils/npc/npc.helpers.ts'
import LootListItemMenu from './LootListItemMenu.vue'
import { formatNumber } from '../utils/number.ts'

const emit = defineEmits(['click', 'ignore', 'edit'])

const { lootEntry } = defineProps<{ lootEntry: LootEntry }>()

const isUnknownItem = computed(() => lootEntry.item.value === undefined)
const NPC = computed(() => {
  const NPCs = lootEntry.item.NPCs || []

  if (!NPCs.length) return null

  return getNPC(NPCs[0])
})

const totalValue = computed(
  () => (lootEntry.item.value || 0) * lootEntry.amount,
)
const totalValueFormatted = computed(() => formatNumber(totalValue.value))

const individualValue = computed(() => lootEntry.item.value || 0)
const invdividualValueFormatted = computed(() =>
  formatNumber(individualValue.value),
)

const valueColor = computed(() =>
  isUnknownItem.value ? 'warning' : 'secondary',
)

function onClick() {
  emit('click')
}
</script>

<template>
  <VCard
    class="loot-list-item__card"
    v-on="isUnknownItem ? { click: onClick } : {}"
  >
    <VCardText class="loot-list-item__text">
      <div class="loot-list-item__name">
        <LootListItemMenu
          @ignore="emit('ignore', lootEntry.item.name)"
          @edit="emit('edit')"
        />

        <!-- Item name -->
        <v-badge color="secondary" :content="`${lootEntry.amount}x`">
          <v-chip>
            {{ lootEntry.item.name }}
          </v-chip>
        </v-badge>
      </div>

      <div>
        <v-tooltip v-if="NPC" location="top" :text="NPC.location">
          <template v-slot:activator="{ props }">
            <v-chip class="mr-2" v-bind="props" :color="NPC.color">
              <span class="mr-1">{{ NPC.name }}</span>
              <v-icon icon="mdi-account-cash" />
            </v-chip>
          </template>
        </v-tooltip>

        <!-- Total value -->
        <v-tooltip
          location="top"
          :text="`${invdividualValueFormatted} Gold each`"
        >
          <template v-slot:activator="{ props }">
            <v-chip :color="valueColor" v-bind="props">
              <span class="mr-1" v-if="isUnknownItem"> unknown </span>
              <span class="mr-1" v-else>
                {{ totalValueFormatted }}
              </span>
              <v-icon icon="mdi-gold" />
            </v-chip>
          </template>
        </v-tooltip>
      </div>
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

.loot-list-item__text {
  display: flex;
  justify-content: space-between;
}
</style>
