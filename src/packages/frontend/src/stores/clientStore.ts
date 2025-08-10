import { defineStore } from 'pinia'
import { clientApi } from '../utils/api/api.client.ts'
import { useConfigStore } from './configStore.ts'

export type Client = {
  id: string
}

export type ClientStoreData = {
  client: Client | null
}

const DEFAULT_CLIENT_STORE_DATA: ClientStoreData = {
  client: null,
}

export const useClientStore = defineStore('client', {
  state: () => {
    return { ...DEFAULT_CLIENT_STORE_DATA }
  },
  actions: {
    async onBoot() {
      const configStore = useConfigStore()
      const clientId = configStore.config.clientId

      // TODO I think the return types aren't correct yet
      let client = await clientApi.clientControllerFindOne(clientId)

      if (!client) {
        client = await clientApi.clientControllerCreate({
          id: clientId,
        })
      }

      // TODO set this.client to the client response
    },
  },
})
