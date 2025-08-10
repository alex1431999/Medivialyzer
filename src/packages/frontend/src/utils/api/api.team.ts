import { TeamApi } from '../generated/api-client'
import { API_BASE_PATH } from './api.constants.ts'

export const teamApi = new TeamApi(undefined, API_BASE_PATH)
