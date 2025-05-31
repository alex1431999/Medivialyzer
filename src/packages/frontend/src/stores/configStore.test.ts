import { beforeEach, describe, test, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigStore } from './configStore.ts'

describe('configStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('unique clientId is set', () => {
    const configStore = useConfigStore()
    expect(configStore.config.clientId).toBeDefined()
  })
})
