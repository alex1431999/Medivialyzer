import { WasteDto } from '../generated/api-client'
import _ from 'lodash'

export function filterOutdatedWaste(waste: WasteDto) {
  const wasteSubmittedAt = new Date(waste.createdAt).getTime()
  const THIRTY_MINUTES = 1000 * 60 * 30

  return wasteSubmittedAt > Date.now() - THIRTY_MINUTES
}

export function getTotalWaste(wastes: WasteDto[]) {
  const memberIds = _.uniq(_.map(wastes, 'client.id'))
  const wastesOfMembers = memberIds
    .map((memberId) => getMemberWaste(memberId, wastes))
    .filter((waste) => waste !== undefined)
  const wasteAmounts = _.map(wastesOfMembers, 'wasteAmount')

  return _.sum(wasteAmounts)
}

export function getMembersWithWaste(wastes: WasteDto[]) {
  const memberIds = _.uniq(_.map(wastes, 'client.id'))
  return memberIds.filter((memberId) => !!getMemberWaste(memberId, wastes))
}

export function getMemberWaste(memberId: string, wastes: WasteDto[]) {
  const relevantWastes = wastes.filter(filterOutdatedWaste)
  const mostRecentWaste = _.sortBy(relevantWastes, 'createdAt')
    .reverse()
    .find((wasteCurrnet) => wasteCurrnet.client.id === memberId)

  return mostRecentWaste || undefined
}

export function calculateMemberPayout(
  memberId: string,
  wastes: WasteDto[],
  totalLootValue: number,
): number | undefined {
  const memberWaste = getMemberWaste(memberId, wastes)
  if (!memberWaste) return undefined

  const memberIds = _.uniq(_.map(wastes, 'client.id'))
  const wastesOfMembers = memberIds
    .map((memberIdCurrent) => getMemberWaste(memberIdCurrent, wastes))
    .filter((waste) => waste !== undefined)

  const wasteSums = _.map(wastesOfMembers, 'wasteAmount')
  const totalWaste = _.sum(wasteSums)

  const totalProfit = totalLootValue - totalWaste
  const profitEach = totalProfit / wastesOfMembers.length

  return profitEach + memberWaste.wasteAmount
}
