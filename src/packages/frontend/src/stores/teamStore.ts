import { defineStore } from 'pinia'
import { useConfigStore } from './configStore.ts'
import { teamApi } from '../utils/api/api.team.ts'

export type Team = {
  id: string
  owner: string // Client ID of the owner
  name: string
  members: Member[]
}

export type Member = {
  id: string
  name: string
}

export type TeamCreateData = Pick<Team, 'name'>

export type TeamStoreData = {
  teams: Team[]
  isLoading: boolean
}

const DEFAULT_TEAM_STORE_DATA: TeamStoreData = {
  teams: [],
  isLoading: false,
}

export const useTeamStore = defineStore('team', {
  state: () => {
    return { ...DEFAULT_TEAM_STORE_DATA }
  },
  actions: {
    async onBoot() {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      const teams = (await teamApi.teamControllerFindAll(clientId)).data

      // TODO we need to change the endpoint to actually return proper member entities here
      const teamsWithMembers = teams.map((team) => ({
        ...team,
        members: team.members.map((id) => ({ id, name: 'TODO' })),
      }))

      this.teams = teamsWithMembers
    },

    async create(createData: TeamCreateData) {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      try {
        this.isLoading = true

        const response = await teamApi.teamControllerCreate({
          ...createData,
          owner: clientId,
        })

        this.teams.push(response.data)

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        throw error
      }
    },
  },
})
