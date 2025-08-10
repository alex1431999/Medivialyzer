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

      const doesClientExist = (await clientApi.clientControllerExists(clientId))
        .data

      if (!doesClientExist) {
        await clientApi.clientControllerCreate({
          id: clientId,
        })
      }

      this.client = (await clientApi.clientControllerFindOne(clientId)).data
    },
  },
})
