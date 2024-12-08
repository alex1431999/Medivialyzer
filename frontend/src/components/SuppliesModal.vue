<script setup lang="ts">

import {VBtn, VDialog, VTable, VCard, VCardActions, VCardText, VBadge}  from "vuetify/components";
import {SUPPLIES} from "../utils/supplies/supplies.constants.ts";

</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn size="small" icon="mdi-flask" color="secondary" v-bind="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Supplies">
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
                <td><input class="supplies-modal__supply-input" type="number" :size="5"></td>
                <td><input class="supplies-modal__supply-input" type="number"></td>
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
.supplies-modal__supply-input {
  width: 50px;
}
</style>