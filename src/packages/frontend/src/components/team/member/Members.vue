<script setup lang="ts">
import { VList, VListItem } from 'vuetify/components'
import Member from './Member.vue'
import { Member as MemberType, Team } from '../../../stores/teamStore.ts'
import { computed } from 'vue'
import { getMembersWithWaste } from '../../../utils/waste/waste.utils.ts'

const { members, team, isSplitMode } = defineProps<{
  members: MemberType[]
  team: Team
  isSplitMode: boolean
}>()

const membersWithWasteIds = computed(() =>
  getMembersWithWaste(team.wastes, team.resetTimestamp),
)

function shouldRender(memberId: string) {
  if (!isSplitMode) {
    return true
  }

  return membersWithWasteIds.value.includes(memberId)
}
</script>

<template>
  <v-list style="max-height: 300px">
    <v-list-item v-if="shouldRender(team.owner.id)">
      <Member :member="team.owner" :team="team" />
    </v-list-item>
    <template v-for="member in members" :key="member.id">
      <v-list-item v-if="shouldRender(member.id)">
        <Member :member="member" :team="team" />
      </v-list-item>
    </template>
  </v-list>
</template>
