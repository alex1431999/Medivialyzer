export abstract class LootDataType {
  abstract type: string

  public abstract matches(line: string): boolean

  public abstract toValue(line: string): any
}
