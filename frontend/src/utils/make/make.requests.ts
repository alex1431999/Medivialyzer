export type Config = {
  version: string
  downloadLink: string
}

export async function getConfig(): Promise<Config> {
  return {
    version: '1.1.2',
    downloadLink:
      'https://github.com/alex1431999/Medivialyzer/releases/download/1.1.1/Medivialyzer-1.1.1.zip',
  } // TODO dummy data just for now

  const url = 'https://hook.eu1.make.com/nx6wqgp7mmsep1vfotb31d4r4j92vymh'

  const response = await fetch(url, {
    method: 'GET',
  })

  return response.json()
}
