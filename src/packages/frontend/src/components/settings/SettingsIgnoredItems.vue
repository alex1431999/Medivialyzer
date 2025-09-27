<script setup lang="ts">
import { VBtn, VList, VListItem, VAlert } from 'vuetify/components'
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.ts'

const configStore = useConfigStore()

const ignoredItems = computed(() => configStore.config.ignoredItems.sort())

function onRemoveIgnoredItem(itemName: string) {
  configStore.removeIgnoredItems(itemName)
}
</script>

<template>
  <v-list class="settings-ignored-items__list" v-if="ignoredItems.length > 0">
    <v-list-item
      class="overflow-hidden mb-2 pa-2"
      v-for="itemName in ignoredItems"
      :key="itemName"
      variant="elevated"
    >
      <div class="d-flex justify-space-between">
        <div>{{ itemName }}</div>
        <v-btn
          icon="mdi-trash-can"
          size="x-small"
          color="error"
          @click="onRemoveIgnoredItem(itemName)"
        />
      </div>
    </v-list-item>
  </v-list>
  <div class="d-flex justify-center" v-else>
    <v-alert
      text="You have not ignored an item yet"
      type="info"
      color="secondary"
    />
  </div>
</template>

<style scoped>
.settings-ignored-items__list {
  max-height: 300px;
}
</style>
