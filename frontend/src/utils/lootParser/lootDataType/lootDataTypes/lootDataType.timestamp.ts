import { LootDataType } from '../lootDataType.ts'

export class LootDataTypeTimestamp extends LootDataType {
  public type = 'timestamp'

  public matches(line: string): boolean {
    return line.trim().toLowerCase().startsWith('channel saved at')
  }

  public toValue(line: string): number {
    const timesStampString = line.toLowerCase().split('channel saved at')[1]
    const date = new Date(timesStampString)
    return date.getTime()
  }
}

export const lootDataTypeTimestamp = new LootDataTypeTimestamp()
