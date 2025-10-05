import { WasteDto } from '../generated/api-client'
import _ from 'lodash'

export function filterOutdatedWaste(
  waste: WasteDto,
  resetTimestamp: string | null,
) {
  const wasteSubmittedAt = new Date(waste.createdAt).getTime()
  if (resetTimestamp) {
    return wasteSubmittedAt > new Date(resetTimestamp).getTime()
  }

  return true
}

export function getTotalWaste(
  wastes: WasteDto[],
  resetTimestamp: string | null,
) {
  const memberIds = _.uniq(_.map(wastes, 'client.id'))
  const wastesOfMembers = memberIds
    .map((memberId) => getMemberWaste(memberId, wastes, resetTimestamp))
    .filter((waste) => waste !== undefined)
  const wasteAmounts = _.map(wastesOfMembers, 'wasteAmount')

  return _.sum(wasteAmounts)
}

export function getMembersWithWaste(
  wastes: WasteDto[],
  resetTimestamp: string | null,
) {
  const memberIds = _.uniq(_.map(wastes, 'client.id'))
  return memberIds.filter(
    (memberId) => !!getMemberWaste(memberId, wastes, resetTimestamp),
  )
}

export function getMemberWaste(
  memberId: string,
  wastes: WasteDto[],
  resetTimestamp: string | null,
) {
  const relevantWastes = wastes.filter((waste) =>
    filterOutdatedWaste(waste, resetTimestamp),
  )
  const mostRecentWaste = _.sortBy(relevantWastes, 'createdAt')
    .reverse()
    .find((wasteCurrnet) => wasteCurrnet.client.id === memberId)

  return mostRecentWaste || undefined
}

export function calculateMemberPayout(
  memberId: string,
  wastes: WasteDto[],
  totalLootValue: number,
  resetTimestamp: string | null,
): number | undefined {
  const memberWaste = getMemberWaste(memberId, wastes, resetTimestamp)
  if (!memberWaste) return undefined

  const memberIds = _.uniq(_.map(wastes, 'client.id'))
  const wastesOfMembers = memberIds
    .map((memberIdCurrent) =>
      getMemberWaste(memberIdCurrent, wastes, resetTimestamp),
    )
    .filter((waste) => waste !== undefined)

  const wasteSums = _.map(wastesOfMembers, 'wasteAmount')
  const totalWaste = _.sum(wasteSums)

  const totalProfit = totalLootValue - totalWaste
  const profitEach = totalProfit / wastesOfMembers.length

  return profitEach + memberWaste.wasteAmount
}
