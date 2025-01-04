import Store from 'electron-store'
import { DEFAULT_LOOT_FILE_PATH } from '../utils/lootData';

export const configStore = new Store()

const DEFAULT_CONFIG_STORE_VALUES = {
  lootFilePath: DEFAULT_LOOT_FILE_PATH
}

// Load default values for the sotre
const storedState: any = configStore.get('config')
configStore.set('config', { ...DEFAULT_CONFIG_STORE_VALUES, ...storedState })