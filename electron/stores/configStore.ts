import Store from 'electron-store'

export const configStore = new Store()

configStore.set('test', 'hello')