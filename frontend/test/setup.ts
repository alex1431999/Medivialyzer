import { beforeEach } from 'vitest'
import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

const app = createApp({})

beforeEach(() => {
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
})
