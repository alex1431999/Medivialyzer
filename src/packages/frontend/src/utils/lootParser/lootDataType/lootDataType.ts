export abstract class LootDataType {
  abstract type: string

  public abstract matches(line: string): boolean

  public abstract toValue(line: string): any

  public matchesLootOf(line: string): boolean {
    return line.trim().toLowerCase().includes('loot of')
  }

  public matchesBag(line: string): boolean {
    return line.trim().toLowerCase().includes('content of a bag')
  }
}
