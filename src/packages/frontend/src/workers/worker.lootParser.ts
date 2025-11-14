import { LootParser } from '../utils/lootParser/lootParser.ts'

self.onmessage = function (event) {
  const { lootData, options } = event.data

  const lootParser = new LootParser(lootData)

  const lootDataParsed = lootParser.parse(options)

  self.postMessage(lootDataParsed)
}
