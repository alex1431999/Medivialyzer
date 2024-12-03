<script setup lang="ts">
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VList, VListItem } from 'vuetify/components'
import { ref } from 'vue'

const props = defineProps<{ ignoredItems: Set<string> }>()
const emit = defineEmits(['close', 'removeIgnoredItem'])

const dialog = ref(true)

const closeDialog = () => {
  dialog.value = false
  emit('close')
}

const removeIgnoredItem = (item: string) => {
  emit('removeIgnoredItem', item)
}
</script>

<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <h3>Ignored Items:</h3>
        <v-list v-if="props.ignoredItems.size > 0">
          <v-list-item v-for="item in props.ignoredItems" :key="item">
            {{ item }}
            <v-btn icon="mdi-delete" size="small" @click="removeIgnoredItem(item)"></v-btn>
          </v-list-item>
        </v-list>
        <p v-else>No items are currently ignored.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Add any additional styles here */
</style>