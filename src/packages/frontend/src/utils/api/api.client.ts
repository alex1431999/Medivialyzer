import { ClientApi } from '../generated/api-client'
import { API_BASE_PATH } from './api.constants.ts'

export const clientApi = new ClientApi(undefined, API_BASE_PATH)
