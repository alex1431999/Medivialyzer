import { LootParserV2 } from '../utils/lootParser/lootParser.v2.ts'

self.onmessage = function (event) {
  const { lootData } = event.data
  const lootParser = new LootParserV2()

  const lootDataParsed = lootParser.parseSync(lootData)

  self.postMessage(lootDataParsed)
}
