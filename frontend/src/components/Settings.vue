<script setup lang="ts">

import {
  VList,
  VListItem,
  VBtn,
  VCardTitle,
  VCard,
  VDialog,
  VCardActions, VCardText
} from "vuetify/components";
import {useConfigStore} from "../stores/configStore.ts";
import {computed} from "vue";

const configStore = useConfigStore()

const ignoredItems = computed(() => configStore.config.ignoredItems.sort())

function onRemoveIgnoredItem(itemName: string) {
  configStore.removeIgnoredItems(itemName)
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn  icon="mdi-cog" v-bind="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>
          Ignored items
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item class="settings__list-item" v-for="itemName in ignoredItems" :key="itemName">
              <div class="settings__list-item__content">
                <div>{{ itemName }}</div>
                <v-btn icon="mdi-trash-can" size="small" color="error" @click="onRemoveIgnoredItem(itemName)" />
              </div>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-btn
              text="Close"
              @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
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