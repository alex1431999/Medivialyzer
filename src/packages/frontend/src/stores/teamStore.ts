import { defineStore } from 'pinia'
import { useConfigStore } from './configStore.ts'
import { teamApi } from '../utils/api/api.team.ts'

export type Team = {
  id: string
  owner: string // Client ID of the owner
  name: string
  members: string[]
}

export type TeamCreateData = Pick<Team, 'name'>

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

    async create(createData: TeamCreateData) {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      const response = await teamApi.teamControllerCreate({
        ...createData,
        owner: clientId,
      })

      this.teams.push(response.data)
    },
  },
})
