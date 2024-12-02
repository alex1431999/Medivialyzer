<script setup lang="ts">

import {LootReader} from "./utils/lootReader/lootReader.ts";


//const path = 'D:\\projects\\Medivialyzer/medivialyzer/src/utils/lootReader/Loot.txt'
//const lootData = window.electron.fs.readFileSync(path).toString();
const lootData = "\n" +
    "Channel saved at Wed Nov 27 19:34:52 2024\n" +
    "19:19 Loot of rotworm: ham.\n" +
    "19:19 Loot of rotworm: ham, meat, a bag.\n" +
    "19:19 Content of a bag within the corpse of rotworm: a sword.\n" +
    "19:19 Loot of rotworm: meat, 10 gold coins, a gold coin.\n" +
    "19:34 Loot of rotworm: ham, a bag.\n" +
    "19:34 Content of a bag within the corpse of rotworm: a sword."

const test = new LootReader(lootData);

const loot = test.getLoot(0)

</script>

<template>
  {{ loot }}
</template>

