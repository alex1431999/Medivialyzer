export type ItemName = string

export type Item = {
    name: ItemName
    value: number
}

export type ItemLooted = Item & {
    amount: number
}