import { defineStore } from 'pinia'
import { useConfigStore } from './configStore.ts'
import { teamApi } from '../utils/api/api.team.ts'
import { UpdateTeamDto } from '../utils/generated/api-client'
import _ from 'lodash'

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
      await this.refresh()
    },

    async refresh() {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      const response = await teamApi.teamControllerFindAll(clientId)

      this.teams = _.sortBy(response.data, 'name')
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

        const teamCreated = response.data

        this.teams.push(teamCreated)
        this.isLoading = false

        return teamCreated
      } catch (error) {
        this.isLoading = false
        throw error
      }
    },

    async update(id: string, updateData: UpdateTeamDto) {
      await teamApi.teamControllerUpdate(id, updateData)
      await this.refresh()
    },
  },
})
