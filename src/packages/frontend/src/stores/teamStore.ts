import { defineStore } from 'pinia'
import { useConfigStore } from './configStore.ts'
import { teamApi } from '../utils/api/api.team.ts'
import { TeamDto, UpdateTeamDto } from '../utils/generated/api-client'
import _ from 'lodash'
import { joinTeamChannels } from '../realtime/realtime.utils.ts'

export type Team = TeamDto

export type Member = Team['members'][number]

export type TeamCreateData = Pick<Team, 'name'>

export type TeamStoreData = {
  teams: TeamDto[]
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

      const teamIds = _.map(this.teams, 'id')
      joinTeamChannels(teamIds)
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

        joinTeamChannels([teamCreated.id])

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

    async remove(id: string) {
      await teamApi.teamControllerRemove(id)
      _.remove(this.teams, (team) => team.id === id)
    },

    async removeMember(id: string, memberId: string) {
      await teamApi.teamControllerRemoveMember(id, memberId)
      await this.refresh()
    },

    async join(id: string) {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      const response = await teamApi.teamControllerCreateMember(id, {
        id: clientId,
      })
      const teamUpdated = response.data

      const teamIndex = this.teams.findIndex((team) => team.id === id)
      if (teamIndex >= 0) this.teams[teamIndex] = teamUpdated

      this.teams.push(teamUpdated)

      return teamUpdated
    },

    async submitWaste(id: string, wasteAmount: number) {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      await teamApi.teamControllerCreateWaste(id, clientId, {
        wasteAmount: wasteAmount,
      })

      await this.refresh()
    },
  },
})
