import { describe, expect, test } from 'vitest'
import { singularize } from './string.ts'

describe('string', () => {
  describe('singularize', () => {
    test('basic items', () => {
      expect(singularize('Gold Coins')).toEqual('Gold Coin')
      expect(singularize('Meat')).toEqual('Meat')
      expect(singularize('Swords')).toEqual('Sword')
    })

    test('special items', () => {
      expect(singularize('Onyxes')).toEqual('Onyx')
      expect(singularize('Topazez')).toEqual('Topaz')
    })
  })
})
