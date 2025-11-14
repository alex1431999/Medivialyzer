import { LootParser } from '../utils/lootParser/lootParser.ts'

self.onmessage = function (event) {
  const { lootData, options, v2 } = event.data

  if (v2) return

  const lootParser = new LootParser(lootData)

  const lootDataParsed = lootParser.parse(options)

  self.postMessage(lootDataParsed)
}
