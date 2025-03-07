import {
  LootDataParsed,
  LootParserOptions,
} from '../utils/lootParser/lootParser.ts'

export function runWorker<Input extends any, Output extends any>(
  path: string,
  input?: Input,
): Promise<Output> {
  return new Promise((resolve, reject) => {
    if (window.Worker) {
      const worker = new Worker(new URL(path, import.meta.url), {
        type: 'module',
      })

      worker.onmessage = (event: MessageEvent) => {
        resolve(event.data as Output)
      }

      worker.postMessage(input)
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
  >('../workers/worker.lootParser.ts', {
    lootData,
    options,
  })
}
