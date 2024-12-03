<script setup lang="ts">
import { defineProps } from 'vue'

import {Loot} from "../utils/loot/loot.types.ts";

const { lootEntry } = defineProps<{ lootEntry: Loot }>()

</script>

<template>
  {{ lootEntry }}
</template>