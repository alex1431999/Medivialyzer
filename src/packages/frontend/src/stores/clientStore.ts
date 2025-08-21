import { defineStore } from 'pinia'
import { clientApi } from '../utils/api/api.client.ts'
import { useConfigStore } from './configStore.ts'

export type Client = {
  id: string
  name: string
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
        // TODO we still need to set a name when the user opens the client for the first time
        await clientApi.clientControllerCreate({
          id: clientId,
          name: 'TODO',
        })
      }

      this.client = (await clientApi.clientControllerFindOne(clientId)).data
    },
  },
})
