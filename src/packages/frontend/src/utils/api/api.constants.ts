import { isProd } from '../env.ts'

export const API_BASE_PATH = isProd
  ? 'https://medivialyzer-api-production.up.railway.app'
  : 'http://localhost:3001'
