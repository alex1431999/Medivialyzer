import { defineStore } from 'pinia'
import { useConfigStore } from './configStore.ts'
import { teamApi } from '../utils/api/api.team.ts'

export type Member = {
  id: string
}

export type Team = {
  id: string
  owner: string // Client ID of the owner
  name: string
  members: Member[]
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
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      this.teams = (await teamApi.teamControllerFindAll(clientId)).data
    },
  },
})
