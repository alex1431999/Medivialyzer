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
  VDivider,
  VBadge,
} from 'vuetify/components'
import { SUPPLIES } from '../../utils/supplies/supplies.constants.ts'
import { useSuppliesStore } from '../../stores/suppliesStore.ts'
import { computed, ref, watch } from 'vue'
import { formatNumber } from '../../utils/number.ts'
import { useConfigStore } from '../../stores/configStore.ts'
import SuppliesVocationFilter from './SuppliesVocationFilter.vue'
import { Vocation, VocationIdentifier } from '../../types/vocation.types.ts'
import { VOCATIONS } from '../../constants/vocations.ts'
import { Supply } from '../../utils/supplies/supplies.types.ts'
import SuppliesSubmitWasteModal from './SuppliesSubmitWasteModal.vue'
import _ from 'lodash'

const suppliesStore = useSuppliesStore()
const configStore = useConfigStore()

const supplyToEdit = ref<Supply | null>(null)

const totalSuppliesUsedFormatted = computed(() =>
  formatNumber(suppliesStore.totalSuppliesUsed),
)

const vocationSelected = computed(
  () =>
    VOCATIONS[
      configStore.config.supplyFilter.vocationSelected as VocationIdentifier
    ] as Vocation,
)

const suppliesFiltered = computed(() =>
  SUPPLIES.filter((supply) =>
    vocationSelected.value.supplies.includes(supply.name),
  ).sort((supply) => (getIsFavorite(supply) ? -1 : 1)),
)

const suppliesFavorites = computed(() => configStore.config.suppliesFavorites)

watch(
  () => suppliesStore.supplies,
  (supplies) => {
    configStore.setSupplies(supplies)
  },
  { deep: true },
)

function onReset() {
  suppliesStore.reset()
}

function onVocationFilterUpdate(vocationIdentifier: VocationIdentifier) {
  configStore.setConfig({
    supplyFilter: { vocationSelected: vocationIdentifier },
  })
}

function getIsFavorite(supply: Supply): boolean {
  return !!_.get(
    suppliesFavorites.value,
    `${vocationSelected.value.id}.${supply.name}`,
  )
}

function setIsFavorite(supply: Supply, value: boolean) {
  const suppliesFavoritesClone = _.cloneDeep(suppliesFavorites.value)
  _.set(
    suppliesFavoritesClone,
    `${vocationSelected.value.id}.${supply.name}`,
    value,
  )

  configStore.setConfig({ suppliesFavorites: suppliesFavoritesClone })
}
</script>

<template>
  <v-dialog max-width="900">
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
          <SuppliesVocationFilter
            class="mb-3 mt-3"
            :active-vocation-id="vocationSelected.id"
            @update="onVocationFilterUpdate"
          />
          <v-divider />
          <v-table class="supplies-modal__table">
            <thead>
              <tr>
                <th>Favorite</th>
                <th>Item</th>
                <th>Before</th>
                <th>After</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supply in suppliesFiltered">
                <td>
                  <v-icon
                    v-if="getIsFavorite(supply)"
                    @click="setIsFavorite(supply, false)"
                  >
                    mdi-star
                  </v-icon>
                  <v-icon v-else @click="setIsFavorite(supply, true)">
                    mdi-star-outline
                  </v-icon>
                </td>
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
                <td>
                  <v-text-field
                    v-if="supplyToEdit?.name === supply.name"
                    v-model="suppliesStore.supplies[supply.name].cost"
                    type="number"
                    variant="solo"
                    :width="80"
                    @keydown.enter="supplyToEdit = null"
                  />
                  <v-badge
                    v-else
                    location="top left"
                    icon="mdi-pencil"
                    color="warning"
                    class="cursor-pointer"
                    @click="supplyToEdit = supply"
                  >
                    <v-chip class="cursor-auto" color="warning">
                      <span class="mr-1">
                        {{ suppliesStore.supplies[supply.name].cost }}
                      </span>
                      <v-icon icon="mdi-gold" />
                    </v-chip>
                  </v-badge>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-card-actions>
          <SuppliesSubmitWasteModal
            :calculated-waste="suppliesStore.totalSuppliesUsed"
          />
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
