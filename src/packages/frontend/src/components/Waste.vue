<script setup lang="ts">
const { wasteAmount } = defineProps<{ wasteAmount?: number }>()
</script>

<template>
  <div>
    {{ wasteAmount }}
  </div>
</template>
