import { LootEntry } from './loot.types.ts';

export function groupLoot(loot: LootEntry[]): LootEntry[] {
  const lootEntryByName: Record<string, LootEntry> = {};

  loot.forEach((lootCurrent: LootEntry) => {
    const name = lootCurrent.item.name;

    if (Object.keys(lootEntryByName).includes(name)) {
      lootEntryByName[name] = {
        ...lootEntryByName[name],
        amount: lootEntryByName[name].amount + lootCurrent.amount,
      };
    } else {
      lootEntryByName[name] = lootCurrent;
    }
  });

  return Object.values(lootEntryByName);
}
