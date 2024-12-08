<script setup lang="ts">

import {VBtn, VDialog, VTable, VCard, VCardText, VChip, VIcon, VCardTitle, VCardActions}  from "vuetify/components";
import {SUPPLIES} from "../utils/supplies/supplies.constants.ts";
import {computed, ref} from "vue";

type SuppliesData = Record<string, { before: number, after: number }>

const INITIAL_SUPPLIES_DATA: SuppliesData = SUPPLIES.reduce((data, supply) => ({ ...data, [supply.name]: { before: 0, after: 0 } }) ,{})

const suppliesData = ref<SuppliesData>(INITIAL_SUPPLIES_DATA)

const totalSuppliesUsed = computed(() => SUPPLIES.reduce((total, supply) => {
  const before = suppliesData.value[supply.name].before
  const after = suppliesData.value[supply.name].after
  const amountUsed = before - after
  const totalSupplyValue = amountUsed * supply.value

  return total + totalSupplyValue
}, 0))


function onBeforeChanged(supplyName: keyof SuppliesData, value: string | null) {
  suppliesData.value[supplyName].before = parseInt(value || '0', 10)
}

function onAfterChanged(supplyName: keyof SuppliesData, value: string | null) {
  suppliesData.value[supplyName].after = parseInt(value || '0', 10)
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn size="small" icon="mdi-flask" color="secondary" v-bind="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="supplies-modal__header">
          <div>
            Supplies
          </div>
          <v-chip color="warning">
            {{ totalSuppliesUsed }}
            <v-icon icon="mdi-gold" />
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th>
                  Item
                </th>
                <th>
                  Before
                </th>
                <th>
                  After
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supply in SUPPLIES">
                <td>{{ supply.name }}</td>
                <td>
                  <input
                    :value="suppliesData[supply.name].before"
                    class="supplies-modal__supply-input"
                    type="number"
                    @change="onBeforeChanged(supply.name, ($event.target as any).value)">
                </td>
                <td>
                  <input
                    :value="suppliesData[supply.name].after"
                    class="supplies-modal__supply-input"
                    type="number"
                    @change="onAfterChanged(supply.name, ($event.target as any).value)">
                </td>
              </tr>
            </tbody>
          </v-table>
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
.supplies-modal__header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px
}

.supplies-modal__supply-input {
  width: 50px;
}
</style>