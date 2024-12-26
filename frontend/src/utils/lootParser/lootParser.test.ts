import {describe, expect, test} from "vitest";
import {LootParser} from "./lootParser.ts";

describe('lootParser', () => {
    test('no loot', () => {
        const lootParser = new LootParser('');
        expect(lootParser.getLoot(0)).toEqual([])
    })

    test('basic case', () => {
        const lootData = `
        Channel saved at Wed Dec 04 19:29:20 2024
        19:14 Loot of giant cobra: 66 gold coins.
        `
        const lootParser = new LootParser(lootData);
        expect(lootParser.getLoot(0)).toEqual([
            {
                item: {
                    name: 'Gold Coin',
                    value: 1
                },
                amount: 66,
                timestamp: new Date('Wed Dec 04 19:29:20 2024').getTime()
            }
        ])
    })
})