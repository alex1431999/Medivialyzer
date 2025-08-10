import { ClientApi } from '../generated/api-client'

// TODO CORS issue
export const clientApi = new ClientApi(undefined, 'http://localhost:3001')
