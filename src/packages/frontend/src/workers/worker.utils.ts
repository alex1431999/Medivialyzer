import {
  LootDataParsed,
  LootParserOptions,
} from '../utils/lootParser/lootParser.ts'

import WorkerLootParser from './worker.lootParser.ts?worker&inline'
import { CreaturesToLootMap } from '../utils/lootParser/lootParser.v2.ts'

export function runWorker<Input extends any, Output extends any>(
  input?: Input,
): Promise<Output> {
  return new Promise((resolve, reject) => {
    if (window.Worker) {
      const worker = new WorkerLootParser()

      worker.onmessage = (event: MessageEvent) => {
        resolve(event.data as Output)
      }

      worker.postMessage(JSON.parse(JSON.stringify(input)))
    } else {
      reject(new Error('Worker not supported'))
    }
  })
}

export function runWorkerLootParser(
  lootData: string,
  options?: LootParserOptions,
) {
  return runWorker<
    { lootData: string; options?: LootParserOptions },
    LootDataParsed
  >({
    lootData,
    options,
  })
}

export function runWorkerLootParserV2(lootData: string) {
  return runWorker<{ lootData: string }, CreaturesToLootMap>({ lootData })
}
