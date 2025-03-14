import { beforeAll } from 'vitest'
import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

const app = createApp({})

beforeAll(() => {
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
})
