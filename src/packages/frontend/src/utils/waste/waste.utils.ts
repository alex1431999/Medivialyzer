import { WasteDto } from '../generated/api-client'

export function filterOutdatedWaste(waste: WasteDto) {
  const wasteSubmittedAt = new Date(waste.createdAt).getTime()
  const THIRTY_MINUTES = 1000 * 60 * 30

  return wasteSubmittedAt > Date.now() - THIRTY_MINUTES
}
