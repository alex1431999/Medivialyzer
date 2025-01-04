import fs from "node:fs";
import path from "path";
import * as os from "node:os";
import { configStore } from '../stores/configStore';

export const DEFAULT_LOOT_FILE_PATH = path.join(os.homedir(), 'medivia', 'Loot.txt');

export function getLootData() {
    const filePath = (configStore.get('config') as any).lootFilePath || DEFAULT_LOOT_FILE_PATH

    try {
        return fs.readFileSync(filePath).toString()
    }
    catch (error) {
        return ''
    }
}