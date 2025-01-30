<script setup lang="ts">
import {
  VBtn,
  VDialog,
  VTable,
  VCard,
  VCardText,
  VChip,
  VIcon,
  VCardTitle,
  VCardActions,
  VTextField,
} from 'vuetify/components'
import { SUPPLIES } from '../utils/supplies/supplies.constants.ts'
import { useSuppliesStore } from '../stores/suppliesStore.ts'
import { computed } from 'vue'
import { formatNumber } from '../utils/number.ts'

const suppliesStore = useSuppliesStore()

const totalSuppliesUsedFormatted = computed(() =>
  formatNumber(suppliesStore.totalSuppliesUsed),
)

function onReset() {
  suppliesStore.reset()
}
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="small"
        icon="mdi-flask"
        color="secondary"
        v-bind="activatorProps"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="supplies-modal__header">
          <div>Supplies</div>
          <v-chip color="warning">
            {{ totalSuppliesUsedFormatted }}
            <v-icon icon="mdi-gold" />
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-table class="supplies-modal__table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supply in SUPPLIES">
                <td>{{ supply.name }}</td>
                <td>
                  <v-text-field
                    v-model="suppliesStore.supplies[supply.name].before"
                    type="number"
                    variant="solo"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="suppliesStore.supplies[supply.name].after"
                    type="number"
                    variant="solo"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Reset" @click="onReset"></v-btn>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.supplies-modal__header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.supplies-modal__table {
  max-height: 300px;
}
</style>
