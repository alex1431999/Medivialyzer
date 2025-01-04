import fs from "node:fs";
import path from "path";
import * as os from "node:os";

export const DEFAULT_LOOT_FILE_PATH = path.join(os.homedir(), 'medivia', 'Loot.txt');

export function getLootData() {
    try {
        return fs.readFileSync(DEFAULT_LOOT_FILE_PATH).toString()
    }
    catch (error) {
        return ''
    }
}