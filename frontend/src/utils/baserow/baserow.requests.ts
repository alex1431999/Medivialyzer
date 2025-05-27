import { Item } from '../item/item.types.ts'

const BASEROW_API_PUBLIC_TOKEN = '6tUmTbXMXWAUpeDOy74jz6UdnUsWr9SZ'

export function baserowSubmitItem(item: Item, isEdit: boolean) {
  const url =
    'https://api.baserow.io/api/database/views/form/6SG9rcE5kunuC5IuxodLoO3VjwEDdwsDsyoOf7GhP3I/submit/'
  const payload = {
    field_3170716: item.name,
    field_3170717: item.value,
    field_3173341: (item.NPCs || [])[0],
    field_3310678: isEdit,
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function baserowPing(clientId: string) {
  const url =
    'https://api.baserow.io/api/database/views/form/hZxFSadGlDLaChlEpTPoW4P5jKGOnG54RH3-Zx3n7Ws/submit/'
  const payload = {
    field_4433532: clientId,
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export type AppRemoteConfig = {
  version: string
  downloadLink: string
}

export async function getRemoteConfig(): Promise<AppRemoteConfig> {
  const url =
    'https://api.baserow.io/api/database/rows/table/433953/?user_field_names=true'

  const reponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${BASEROW_API_PUBLIC_TOKEN}`,
    },
  })

  const data: any = await reponse.json()

  return data.results[0]
}
