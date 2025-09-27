<script setup lang="ts">
import { VCheckbox } from 'vuetify/components'
import { useConfigStore } from '../stores/configStore.ts'
import { ref, watch } from 'vue'

const configStore = useConfigStore()

const isChecked = ref<boolean>(configStore.config.ignoreItemsWithNoValue)

watch(isChecked, (value) => {
  configStore.setConfig({ ignoreItemsWithNoValue: value })
})
</script>

<template>
  <v-checkbox label="Ignore items with no value" v-model="isChecked" />
</template>
