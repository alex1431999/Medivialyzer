import { describe, test, expect } from 'vitest'
import { WasteDto } from '../generated/api-client'
import { calculateMemberShare, getMemberWaste } from './waste.utils.ts'

describe('waste utils', () => {
  describe('getMemberWaste', () => {
    test('member hasnt submitted waste', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: 'someone else' },
          createdAt: new Date(Date.now()).toISOString(),
        },
      ]

      expect(getMemberWaste(memberId, wastes)).toEqual(undefined)
    })

    test('waste is outdated', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: memberId },
          createdAt: new Date(0).toISOString(),
        },
      ]

      expect(getMemberWaste(memberId, wastes)).toEqual(undefined)
    })

    test('gets correct waste', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: memberId },
          createdAt: new Date(Date.now()).toISOString(),
        },
      ]

      expect(getMemberWaste(memberId, wastes)).toEqual(wastes[0])
    })
  })

  describe('calculateMemberProfit', () => {
    test('member hasnt submitted waste', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: 'someone else' },
          createdAt: new Date().toISOString(),
        },
      ]

      expect(calculateMemberShare(memberId, wastes, 100)).toEqual(undefined)
    })

    test('member has made profit', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: memberId },
          createdAt: new Date(Date.now()).toISOString(),
        },
        {
          wasteAmount: 100,
          client: { name: 'test', id: 'someone else' },
          createdAt: new Date(Date.now()).toISOString(),
        },
      ]

      expect(calculateMemberShare(memberId, wastes, 400)).toEqual(200)
    })

    test('member has wasted', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: memberId },
          createdAt: new Date(Date.now()).toISOString(),
        },
        {
          wasteAmount: 100,
          client: { name: 'test', id: 'someone else' },
          createdAt: new Date(Date.now()).toISOString(),
        },
      ]

      expect(calculateMemberShare(memberId, wastes, 50)).toEqual(25)
    })

    test('individual waste is not even', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 500,
          client: { name: 'test', id: memberId },
          createdAt: new Date(Date.now()).toISOString(),
        },
        {
          wasteAmount: 1000,
          client: { name: 'test', id: 'someone else' },
          createdAt: new Date(Date.now()).toISOString(),
        },
      ]

      expect(calculateMemberShare(memberId, wastes, 1500)).toEqual(500)
    })
  })
})
