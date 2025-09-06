import { defineStore } from 'pinia'
import { clientApi } from '../utils/api/api.client.ts'
import { useConfigStore } from './configStore.ts'
import { UpdateClientDto } from '../utils/generated/api-client'

export type Client = {
  id: string
  name: string
}

export type ClientStoreData = {
  client: Client | null
  initialized: boolean
}

const DEFAULT_CLIENT_STORE_DATA: ClientStoreData = {
  client: null,
  initialized: false,
}

export const useClientStore = defineStore('client', {
  state: () => {
    return { ...DEFAULT_CLIENT_STORE_DATA }
  },
  actions: {
    async onBoot() {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      const doesClientExist = (await clientApi.clientControllerExists(clientId))
        .data

      if (doesClientExist) {
        this.client = (await clientApi.clientControllerFindOne(clientId)).data
      }

      this.initialized = true
    },

    async create(name: string) {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      await clientApi.clientControllerCreate({
        id: clientId,
        name,
      })

      this.client = (await clientApi.clientControllerFindOne(clientId)).data
    },

    async update(updateData: UpdateClientDto) {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      this.client = (
        await clientApi.clientControllerUpdate(clientId, updateData)
      ).data
    },
  },
})
