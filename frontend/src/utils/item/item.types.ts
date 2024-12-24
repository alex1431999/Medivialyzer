export type ItemName = string

export type Item = {
    name: ItemName
    value?: number
    NPCs?: string[]
}

export type ItemLooted = Item & {
    amount: number
}