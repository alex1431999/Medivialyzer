import { LootParserV2 } from '../utils/lootParser/lootParser.v2.ts'

self.onmessage = function (event) {
  const { lootData, v2 } = event.data
  if (!v2) return
  const lootParser = new LootParserV2()

  const lootDataParsed = lootParser.parseSync(lootData)

  self.postMessage(lootDataParsed)
}
