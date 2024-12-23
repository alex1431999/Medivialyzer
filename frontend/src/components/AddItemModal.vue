<script setup lang="ts">
import { VDialog } from "vuetify/components";
import {ref, watch} from "vue";

const { itemToAddName } = defineProps<{ itemToAddName: string | null }>()

const isOpen = ref<boolean>(false)

watch(() => itemToAddName, () => {
  isOpen.value = itemToAddName !== null
})

</script>

<template>
  <v-dialog v-model="isOpen">
    <template v-slot:default>
      {{ itemToAddName }}
    </template>
  </v-dialog>
</template>
