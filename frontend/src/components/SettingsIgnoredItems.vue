<script setup lang="ts">

import {VBtn, VList, VListItem, VAlert} from "vuetify/components";
import {computed} from "vue";
import {useConfigStore} from "../stores/configStore.ts";

const configStore = useConfigStore()

const ignoredItems = computed(() => configStore.config.ignoredItems.sort())

function onRemoveIgnoredItem(itemName: string) {
  configStore.removeIgnoredItems(itemName)
}

</script>

<template>
  <v-list v-if="ignoredItems.length > 0">
    <v-list-item class="settings__list-item" v-for="itemName in ignoredItems" :key="itemName">
      <div class="settings__list-item__content">
        <div>{{ itemName }}</div>
        <v-btn icon="mdi-trash-can" size="small" color="error" @click="onRemoveIgnoredItem(itemName)" />
      </div>
    </v-list-item>
  </v-list>
  <div class="d-flex justify-center" v-else>
    <v-alert text="You have not ignored an item yet" type="info" color="secondary"/>
  </div>
</template>

<style scoped>
.settings__list-item {
  overflow: hidden;
}

.settings__list-item__content {
  display: flex;
  justify-content: space-between;
}
</style>