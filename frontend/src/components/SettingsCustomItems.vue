<script setup lang="ts">
import { VBtn, VList, VListItem, VAlert } from 'vuetify/components';
import { computed } from 'vue';
import { useConfigStore } from '../stores/configStore.ts';
import { Item } from '../utils/item/item.types.ts';
import _ from 'lodash';

const configStore = useConfigStore();

const customItems = computed(() =>
  _.sortBy(configStore.config.customItems, 'name'),
);

function onRemoveCustomItem(item: Item) {
  configStore.removeCustomItem(item);
}
</script>

<template>
  <v-list class="settings-custom-items__list" v-if="customItems.length > 0">
    <v-list-item
      class="overflow-hidden mb-2 pa-2"
      variant="elevated"
      v-for="item in customItems"
      :key="item.name"
    >
      <div class="d-flex justify-space-between">
        <div>{{ item.name }}</div>
        <v-btn
          icon="mdi-trash-can"
          size="x-small"
          color="error"
          @click="onRemoveCustomItem(item)"
        />
      </div>
    </v-list-item>
  </v-list>
  <div class="d-flex justify-center" v-else>
    <v-alert
      text="You have added any custom an items yet"
      type="info"
      color="secondary"
    />
  </div>
</template>

<style scoped>
.settings-custom-items__list {
  max-height: 300px;
}
</style>
