import { defineStore } from 'pinia'

export type Team = {
  id: string
  owner: string // Client ID of the owner
  name: string
}

export type TeamStoreData = {
  teams: Team[]
}

const DEFAULT_TEAM_STORE_DATA: TeamStoreData = {
  teams: [],
}

export const useTeamStore = defineStore('team', {
  state: () => {
    return { ...DEFAULT_TEAM_STORE_DATA }
  },
  actions: {
    async onBoot() {
      // TODO load teams
    },
  },
})
