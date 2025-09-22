import { describe, test, expect } from 'vitest'
import { WasteDto } from '../generated/api-client'
import { getMemberWaste } from './waste.utils.ts'

describe('waste utils', () => {
  describe('getMemberWaste', () => {
    test('member hasnt submitted waste', () => {
      const memberId = 'memberId'
      const wastes: WasteDto[] = [
        {
          wasteAmount: 100,
          client: { name: 'test', id: 'someone else' },
          createdAt: new Date().toDateString(),
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
          createdAt: new Date(0).toDateString(),
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
})
