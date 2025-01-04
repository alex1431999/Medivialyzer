<script setup lang="ts">
import {
  VBtn,
  VCardTitle,
  VCard,
  VDialog,
  VCardActions,
  VCardText,
  VTabs,
  VTab,
  VTabsWindow,
  VTabsWindowItem,
} from 'vuetify/components'
import { ref } from 'vue'
import SettingsIgnoredItems from './SettingsIgnoredItems.vue'
import SettingsCustomItems from './SettingsCustomItems.vue'
import SettingsGeneral from './SettingsGeneral.vue'

const tab = ref<string>('general')
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon="mdi-cog" v-bind="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title> Settings </v-card-title>

        <v-tabs color="secondary" v-model="tab">
          <v-tab val="general">General</v-tab>
          <v-tab value="ignoredItems">Ignored items</v-tab>
          <v-tab value="customItems">Custom items</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="general">
              <SettingsGeneral />
            </v-tabs-window-item>

            <v-tabs-window-item value="ignoredItems">
              <SettingsIgnoredItems />
            </v-tabs-window-item>

            <v-tabs-window-item value="customItems">
              <SettingsCustomItems />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
