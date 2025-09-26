import { useClientStore } from '../stores/clientStore.ts'

export function getClient() {
  const clientStore = useClientStore()
  if (!clientStore.client)
    throw new Error('Client has not been initialised yet')

  return clientStore.client
}
