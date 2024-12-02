<script setup lang="ts">

import {lootReader} from "./utils/lootReader/lootReader";

const loot = lootReader.getLoot(0)

</script>

<template>
  {{ loot }}
</template>

